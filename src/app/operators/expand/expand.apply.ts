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

import { ExpandConfig } from "@sanu/operators/expand/expand.config";

/**
 * Normalize align value to a consistent format.
 * Valid values: c, l, r, t, b, lt, rt, lb, rb
 * Default: c (center)
 */
function normalizeAlign(align?: string): string {
  if (!align || typeof align !== 'string') {
    return 'c';
  }

  const normalized = align.toLowerCase().trim();

  // Valid values
  const validAligns = ['c', 'l', 'r', 't', 'b', 'lt', 'rt', 'lb', 'rb'];

  if (validAligns.includes(normalized)) {
    return normalized;
  }

  // Default to center for invalid values
  return 'c';
}

export async function applyExpand(
  input: ImageBitmap,
  config: ExpandConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  const targetWidth = config.width ?? input.width;
  const targetHeight = config.height ?? input.height;

  // If dimensions match input, return as-is (noop)
  if (targetWidth === input.width && targetHeight === input.height && !config.dx && !config.dy) {
    return input;
  }

  // Validate dimensions
  if (targetWidth <= 0 || targetHeight <= 0) {
    return input;
  }

  // Parse align value (default: center)
  const align = normalizeAlign(config.align);

  // Calculate base position based on alignment
  let x = 0;
  let y = 0;

  // Horizontal alignment
  if (align.includes('l')) {
    x = 0;
  } else if (align.includes('r')) {
    x = targetWidth - input.width;
  } else {
    // center (default)
    x = (targetWidth - input.width) / 2;
  }

  // Vertical alignment
  if (align.includes('t')) {
    y = 0;
  } else if (align.includes('b')) {
    y = targetHeight - input.height;
  } else {
    // center (default)
    y = (targetHeight - input.height) / 2;
  }

  // Apply offsets
  x += config.dx ?? 0;
  y += config.dy ?? 0;

  // Create expanded canvas
  const canvas = new OffscreenCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d')!;

  // Draw the input image at calculated position
  ctx.drawImage(input, x, y);

  return createImageBitmap(canvas);
}
