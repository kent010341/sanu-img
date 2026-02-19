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

import { OperatorConfigSchema } from "@sanu/core/operator/config-schema";

export interface ExpandConfig extends Record<string, unknown> {

  width?: number;

  height?: number;

  align?: string;

  dx?: number;

  dy?: number;

}

export const EXPAND_CONFIG_SCHEMA: OperatorConfigSchema<ExpandConfig> = {
  width: {
    key: 'width',
    label: 'Width',
    placeholder: 'Enter width in pixels',
    required: false,
    type: 'number',
  },
  height: {
    key: 'height',
    label: 'Height',
    placeholder: 'Enter height in pixels',
    required: false,
    type: 'number',
  },
  align: {
    key: 'align',
    label: 'Align',
    placeholder: 'Select alignment',
    required: false,
    type: 'select',
    options: [
      { value: 'c', viewValue: 'Center' },
      { value: 'l', viewValue: 'Left' },
      { value: 'r', viewValue: 'Right' },
      { value: 't', viewValue: 'Top' },
      { value: 'b', viewValue: 'Bottom' },
      { value: 'lt', viewValue: 'Left Top' },
      { value: 'rt', viewValue: 'Right Top' },
      { value: 'lb', viewValue: 'Left Bottom' },
      { value: 'rb', viewValue: 'Right Bottom' }
    ]
  },
  dx: {
    key: 'dx',
    label: 'Offset X',
    placeholder: 'Horizontal offset in pixels',
    required: false,
    type: 'number',
  },
  dy: {
    key: 'dy',
    label: 'Offset Y',
    placeholder: 'Vertical offset in pixels',
    required: false,
    type: 'number',
  }
};
