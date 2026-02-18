/**
 * MIT License
 * 
 * Copyright (c) 2026 Kent010341
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

import { Injectable } from '@angular/core';
import { ImageOperator } from '@sanu/core/operator/image-operator';
import { OperatorType } from '@sanu/core/operator/operator-metadata';
import { ResizeOperator } from '@sanu/operators/resize/resize.operator';
import { CropOperator } from '@sanu/operators/crop/crop.operator';
import { TrimOperator } from '@sanu/operators/trim/trim.operator';
import { ExpandOperator } from '@sanu/operators/expand/expand.operator';
import { FillOperator } from '@sanu/operators/fill/fill.operator';

/**
 * Factory service for creating ImageOperator instances.
 * This factory creates operator instances (not the UI components).
 */
@Injectable({
  providedIn: 'root'
})
export class OperatorFactory {

  private readonly operatorCtors: Record<OperatorType, new () => ImageOperator> = {
    [OperatorType.RESIZE]: ResizeOperator,
    [OperatorType.CROP]: CropOperator,
    [OperatorType.TRIM]: TrimOperator,
    [OperatorType.EXPAND]: ExpandOperator,
    [OperatorType.FILL]: FillOperator,
  };

  /**
   * Creates a new ImageOperator instance based on the given type.
   * @param type The type of operator to create
   * @returns A new ImageOperator instance
   * @throws Error if the operator type is not supported
   */
  createOperator(type: OperatorType): ImageOperator {
    const Ctor = this.operatorCtors[type];
    if (!Ctor) {
      throw new Error(`Unsupported operator type: ${type}`);
    }
    return new Ctor();
  }

}
