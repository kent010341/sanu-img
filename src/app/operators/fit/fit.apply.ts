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

import { FitConfig } from "@sanu/operators/fit/fit.config";

/**
 * Apply fit transformation to an image (object-fit: contain behavior)
 * The image will be scaled to fit within the target dimensions while maintaining aspect ratio.
 * 
 * @param input - The input image bitmap
 * @param config - The fit configuration
 * @param enabled - Whether the operator is enabled
 * @returns The fitted image bitmap
 */
export async function applyFit(
  input: ImageBitmap,
  config: FitConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  const targetWidth = config.width;
  const targetHeight = config.height;

  // If neither dimension is specified, return input unchanged
  if (targetWidth == null && targetHeight == null) {
    return input;
  }

  const inputWidth = input.width;
  const inputHeight = input.height;
  const inputAspectRatio = inputWidth / inputHeight;

  let outputWidth: number;
  let outputHeight: number;

  if (targetWidth != null && targetHeight != null) {
    // Both dimensions specified - fit within the box (contain behavior)
    const targetAspectRatio = targetWidth / targetHeight;

    if (inputAspectRatio > targetAspectRatio) {
      // Input is wider - constrain by width
      outputWidth = targetWidth;
      outputHeight = Math.round(targetWidth / inputAspectRatio);
    } else {
      // Input is taller - constrain by height
      outputHeight = targetHeight;
      outputWidth = Math.round(targetHeight * inputAspectRatio);
    }
  } else if (targetWidth != null) {
    // Only width specified
    outputWidth = targetWidth;
    outputHeight = Math.round(targetWidth / inputAspectRatio);
  } else {
    // Only height specified
    outputHeight = targetHeight!;
    outputWidth = Math.round(targetHeight! * inputAspectRatio);
  }

  // If calculated dimensions match input, skip processing
  if (outputWidth === inputWidth && outputHeight === inputHeight) {
    return input;
  }

  const canvas = new OffscreenCanvas(outputWidth, outputHeight);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(input, 0, 0, outputWidth, outputHeight);

  return createImageBitmap(canvas);
}
