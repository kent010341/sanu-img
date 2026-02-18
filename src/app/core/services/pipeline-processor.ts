/**
 * MIT License
 * 
 * Copyright (c) 2025 Kent010341
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Injectable, Signal, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ImageOperator } from "@sanu/core/operator/image-operator";
import { ImagePipeline } from "@sanu/core/pipeline/image-pipeline";
import { combineLatest, from, switchMap } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PipelineProcessor {

  readonly source = signal<ImageBitmap | null>(null);

  readonly operators = signal<ImageOperator[]>([]);

  readonly result: Signal<ImageBitmap | null>;

  private readonly pipeline = new ImagePipeline();

  private readonly source$ = toObservable(this.source);

  private readonly operators$ = toObservable(this.operators);

  constructor() {
    const input$ = combineLatest([this.source$, this.operators$]).pipe(
      switchMap(([src, ops]) => {
        if (src == null) {
          return [null];
        }
        return from(this.pipeline.process(src, ops));
      })
    );

    this.result = toSignal(input$, { initialValue: null });
  }

  appendOperator(operator: ImageOperator): void {
    this.operators.update(ops => [...ops, operator]);
  }

  removeOperator(operatorId: string): void {
    this.operators.update(ops => ops.filter(op => op.id !== operatorId));
  }

}
