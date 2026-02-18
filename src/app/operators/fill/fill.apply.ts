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

import { FillConfig } from "@sanu/operators/fill/fill.config";

/**
 * Parse hex color string to RGB values.
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) formats.
 * Returns null for invalid input.
 */
function parseHexColor(hex?: string): { r: number; g: number; b: number } | null {
  if (!hex || typeof hex !== 'string') {
    return null;
  }

  // Remove leading # if present
  let cleaned = hex.trim();
  if (cleaned.startsWith('#')) {
    cleaned = cleaned.slice(1);
  }

  // Validate format
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleaned)) {
    return null;
  }

  // Expand 3-digit format to 6-digit
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }

  // Parse RGB values
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Check if image has any transparent pixels (alpha = 0).
 */
function hasTransparentPixels(imageData: ImageData): boolean {
  const data = imageData.data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] === 0) {
      return true;
    }
  }
  return false;
}

export async function applyFill(
  input: ImageBitmap,
  config: FillConfig,
  enabled: boolean
): Promise<ImageBitmap> {
  if (!enabled) {
    return input;
  }

  // Parse hex color
  const rgb = parseHexColor(config.color);
  if (!rgb) {
    // Invalid color input, treat as noop
    return input;
  }

  // Create canvas to read pixel data
  const canvas = new OffscreenCanvas(input.width, input.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(input, 0, 0);

  // Get image data
  const imageData = ctx.getImageData(0, 0, input.width, input.height);

  // Check if there are any transparent pixels
  if (!hasTransparentPixels(imageData)) {
    // No transparent pixels, treat as noop
    return input;
  }

  // Fill transparent pixels with the specified color
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Check if pixel is fully transparent (alpha = 0)
    if (data[i + 3] === 0) {
      data[i] = rgb.r;     // Red
      data[i + 1] = rgb.g; // Green
      data[i + 2] = rgb.b; // Blue
      data[i + 3] = 255;   // Alpha (fully opaque)
    }
  }

  // Put modified image data back
  ctx.putImageData(imageData, 0, 0);

  return createImageBitmap(canvas);
}
