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

import { signal } from "@angular/core";
import { BaseOperator } from "@sanu/core/operator/base-operator";
import { OperatorType } from "@sanu/core/operator/operator-metadata";
import { ResizeConfig } from "@sanu/operators/resize/resize.config";

export class ResizeOperator extends BaseOperator<ResizeConfig> {

  override type: OperatorType = OperatorType.RESIZE;

  override config = signal<ResizeConfig>({});

  override async apply(input: ImageBitmap): Promise<ImageBitmap> {
    const config = this.config();
    
    let width: number;
    let height: number;
    
    if (config.width != null && config.height != null) {
      // Both dimensions specified
      width = config.width;
      height = config.height;
    } else if (config.width != null) {
      // Only width specified, calculate height maintaining aspect ratio
      width = config.width;
      height = Math.round((input.height / input.width) * width);
    } else if (config.height != null) {
      // Only height specified, calculate width maintaining aspect ratio
      height = config.height;
      width = Math.round((input.width / input.height) * height);
    } else {
      // Neither specified, keep original dimensions (noop)
      return input;
    }

    // If calculated dimensions match input, skip processing (noop)
    if (width === input.width && height === input.height) {
      return input;
    }

    const canvas = new OffscreenCanvas(width, height);

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(input, 0, 0, width, height);

    return createImageBitmap(canvas);
  }

}
