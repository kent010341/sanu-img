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

import { FlipConfig } from "@sanu/operators/flip/flip.config";

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

export async function applyFlip(
  input: ImageBitmap,
  config: FlipConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  // Parse direction
  const direction = normalizeDirection(config.direction);

  // If invalid direction, treat as noop
  if (!direction) {
    return input;
  }

  // Create canvas for flipping
  const canvas = new OffscreenCanvas(input.width, input.height);
  const ctx = canvas.getContext('2d')!;

  // Apply flip transformation
  if (direction === 'h') {
    // Horizontal flip: scale x by -1 and translate
    ctx.translate(input.width, 0);
    ctx.scale(-1, 1);
  } else {
    // Vertical flip: scale y by -1 and translate
    ctx.translate(0, input.height);
    ctx.scale(1, -1);
  }

  // Draw the flipped image
  ctx.drawImage(input, 0, 0);

  return createImageBitmap(canvas);
}
