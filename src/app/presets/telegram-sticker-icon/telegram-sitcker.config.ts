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

import { PresetConfig } from "@sanu/core/preset/preset-config";
import { PresetType } from "@sanu/core/preset/preset-metadata";
import { OperatorType } from "@sanu/core/operator/operator-metadata";

/**
 * Telegram Sticker Set Icon preset configuration.
 * 
 * Creates sticker set icons with proper dimensions (100x100) and transparent background.
 * 
 * Pipeline:
 * 1. Crop (optional, disabled by default) - Trim 2px from left and right edges
 * 2. Trim - Remove transparent borders
 * 3. Fit - Scale to fit within 100x100 while maintaining aspect ratio
 * 4. Expand - Expand to exactly 100x100 with centered alignment
 */
export const TELEGRAM_STICKER_ICON_CONFIG: PresetConfig = {
  type: PresetType.TELEGRAM_STICKER_ICON,
  operators: [
    {
      type: OperatorType.CROP,
      config: { 
        left: 2, 
        right: 2 
      },
      enabled: false
    },
    {
      type: OperatorType.TRIM,
      config: {},
      enabled: true
    },
    {
      type: OperatorType.FIT,
      config: { 
        width: 100, 
        height: 100 
      },
      enabled: true
    },
    {
      type: OperatorType.EXPAND,
      config: { 
        width: 100, 
        height: 100, 
        align: 'c'
      },
      enabled: true
    }
  ]
};
