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

import { signal } from "@angular/core";
import { BaseOperator } from "@sanu/core/operator/base-operator";
import { OperatorType } from "@sanu/core/operator/operator-metadata";
import { TrimConfig } from "@sanu/operators/trim/trim.config";

export class TrimOperator extends BaseOperator<TrimConfig> {

  override type: OperatorType = OperatorType.TRIM;

  override config = signal<TrimConfig>({});

  override async apply(input: ImageBitmap): Promise<ImageBitmap> {
    const width = input.width;
    const height = input.height;
    
    // Draw input to a canvas to read pixel data
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(input, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Find the bounding box of non-transparent pixels
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        
        // Check if pixel is not fully transparent
        if (alpha > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    // If no non-transparent pixels found, return input as-is
    if (maxX < 0 || maxY < 0) {
      return input;
    }
    
    // Calculate the bounding box dimensions
    const bboxWidth = maxX - minX + 1;
    const bboxHeight = maxY - minY + 1;
    
    // If no trimming needed (entire image is non-transparent), return input as-is
    if (minX === 0 && minY === 0 && bboxWidth === width && bboxHeight === height) {
      return input;
    }
    
    // Create a new canvas with the trimmed dimensions
    const trimmedCanvas = new OffscreenCanvas(bboxWidth, bboxHeight);
    const trimmedCtx = trimmedCanvas.getContext('2d')!;
    
    // Draw the trimmed portion
    trimmedCtx.drawImage(input, minX, minY, bboxWidth, bboxHeight, 0, 0, bboxWidth, bboxHeight);
    
    return createImageBitmap(trimmedCanvas);
  }

}
