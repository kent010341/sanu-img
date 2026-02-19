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

import { LucideIconData } from 'lucide-angular';
import { SimpleIcon, siTelegram } from 'simple-icons';

export enum PresetType {
  
  TELEGRAM_STICKER = 'TELEGRAM_STICKER',

  TELEGRAM_STICKER_ICON = 'TELEGRAM_STICKER_ICON',

}

export interface PresetMetadata {

  readonly type: PresetType;

  readonly label: string;

  readonly description?: string;

  readonly icon: SimpleIcon | LucideIconData;

}

export const PRESET_METADATA: Record<PresetType, PresetMetadata> = {

  [PresetType.TELEGRAM_STICKER]: {
    type: PresetType.TELEGRAM_STICKER,
    label: 'Telegram Sticker',
    description: 'Create Telegram stickers with the correct dimensions and transparent background.',
    icon: siTelegram,
  },

  [PresetType.TELEGRAM_STICKER_ICON]: {
    type: PresetType.TELEGRAM_STICKER_ICON,
    label: 'Telegram Sticker Icon',
    description: 'Create Telegram sticker set icon with the correct dimensions and transparent background.',
    icon: siTelegram,
  },

};
