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

/**
 * Generate a UUID v4.
 * Uses crypto.randomUUID() in secure contexts (localhost, 127.0.0.1, HTTPS).
 * Falls back to Math.random() in non-secure contexts (e.g., HTTP on 192.168.x.x).
 */
export function generateUUID(): string {
  // Check if we're in a secure context and crypto.randomUUID is available
  if (
    typeof window !== 'undefined'
        && window.isSecureContext
        && typeof crypto !== 'undefined'
        && typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  // Fallback implementation for non-secure contexts
  // This generates a valid UUID v4 format using Math.random()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
