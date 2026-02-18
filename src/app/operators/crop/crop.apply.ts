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

import { CropConfig } from "@sanu/operators/crop/crop.config";

export async function applyCrop(
  input: ImageBitmap,
  config: CropConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  const left = config.left ?? 0;
  const right = config.right ?? 0;
  const top = config.top ?? 0;
  const bottom = config.bottom ?? 0;

  // If no cropping is specified, return input as-is (noop)
  if (left === 0 && right === 0 && top === 0 && bottom === 0) {
    return input;
  }

  // Calculate new dimensions
  const width = input.width - left - right;
  const height = input.height - top - bottom;

  // Validate that dimensions are positive. If not, return input as-is (noop)
  if (width <= 0 || height <= 0) {
    return input;
  }

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d')!;

  // Draw the cropped portion of the image
  ctx.drawImage(input, left, top, width, height, 0, 0, width, height);

  return createImageBitmap(canvas);
}
