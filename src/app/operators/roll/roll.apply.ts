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

import { RollConfig } from "@sanu/operators/roll/roll.config";

/**
 * Normalize direction value to a consistent format.
 * Valid values: h (horizontal), v (vertical)
 * Returns null for invalid values (will be treated as noop).
 */
function normalizeDirection(direction?: string): 'h' | 'v' | null {
  if (!direction || typeof direction !== 'string') {
    return null;
  }

  const normalized = direction.toLowerCase().trim();

  if (normalized === 'h' || normalized === 'horizontal') {
    return 'h';
  }

  if (normalized === 'v' || normalized === 'vertical') {
    return 'v';
  }

  return null;
}

export async function applyRoll(
  input: ImageBitmap,
  config: RollConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  // Parse direction
  const direction = normalizeDirection(config.direction);
  
  // Validate direction
  if (!direction) {
    return input;
  }

  // Parse shift amount
  const shift = config.shift ?? 0;
  
  // If shift is 0, treat as noop
  if (shift === 0) {
    return input;
  }

  // Validate shift is a number
  if (typeof shift !== 'number' || !isFinite(shift)) {
    return input;
  }

  // Create canvas for rolling
  const canvas = new OffscreenCanvas(input.width, input.height);
  const ctx = canvas.getContext('2d')!;

  if (direction === 'h') {
    // Horizontal roll
    const width = input.width;
    // Normalize shift to be within [0, width)
    const normalizedShift = ((shift % width) + width) % width;
    
    if (normalizedShift === 0) {
      // No effective shift
      ctx.drawImage(input, 0, 0);
    } else {
      // Draw the right part (width - shift) at the left
      ctx.drawImage(
        input,
        width - normalizedShift, 0, normalizedShift, input.height,  // source
        0, 0, normalizedShift, input.height                          // destination
      );
      
      // Draw the left part (0 to width - shift) at the right
      ctx.drawImage(
        input,
        0, 0, width - normalizedShift, input.height,                // source
        normalizedShift, 0, width - normalizedShift, input.height   // destination
      );
    }
  } else {
    // Vertical roll
    const height = input.height;
    // Normalize shift to be within [0, height)
    const normalizedShift = ((shift % height) + height) % height;
    
    if (normalizedShift === 0) {
      // No effective shift
      ctx.drawImage(input, 0, 0);
    } else {
      // Draw the bottom part (height - shift) at the top
      ctx.drawImage(
        input,
        0, height - normalizedShift, input.width, normalizedShift,  // source
        0, 0, input.width, normalizedShift                          // destination
      );
      
      // Draw the top part (0 to height - shift) at the bottom
      ctx.drawImage(
        input,
        0, 0, input.width, height - normalizedShift,                // source
        0, normalizedShift, input.width, height - normalizedShift   // destination
      );
    }
  }

  return createImageBitmap(canvas);
}
