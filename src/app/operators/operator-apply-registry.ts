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

import { OperatorType } from "@sanu/core/operator/operator-metadata";
import { applyCrop } from "@sanu/operators/crop/crop.apply";
import { applyResize } from "@sanu/operators/resize/resize.apply";
import { applyExpand } from "@sanu/operators/expand/expand.apply";
import { applyTrim } from "@sanu/operators/trim/trim.apply";
import { applyFill } from "@sanu/operators/fill/fill.apply";
import { ConfigType } from "@sanu/core/utils/types";

/**
 * Type definition for operator apply functions
 */
export type OperatorApplyFn = (
  input: ImageBitmap,
  config: ConfigType,
  enabled: boolean
) => Promise<ImageBitmap>;

/**
 * Registry mapping OperatorType to its apply function
 */
export const OPERATOR_APPLY_REGISTRY: Record<OperatorType, OperatorApplyFn> = {
  [OperatorType.CROP]: applyCrop,
  [OperatorType.RESIZE]: applyResize,
  [OperatorType.EXPAND]: applyExpand,
  [OperatorType.TRIM]: applyTrim,
  [OperatorType.FILL]: applyFill,
};

/**
 * Apply an operator's transformation to an input image
 * 
 * @param type - The operator type
 * @param input - The input image bitmap
 * @param config - The operator configuration
 * @param enabled - Whether the operator is enabled
 * @returns The transformed image bitmap
 */
export async function applyOperator(
  type: OperatorType,
  input: ImageBitmap,
  config: ConfigType,
  enabled: boolean
): Promise<ImageBitmap> {
  const applyFn = OPERATOR_APPLY_REGISTRY[type];
  
  if (!applyFn) {
    console.warn(`No apply function registered for operator type: ${type}`);
    return input;
  }
  
  return applyFn(input, config, enabled);
}
