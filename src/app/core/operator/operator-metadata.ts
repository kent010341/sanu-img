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

import { LucideIconData, Move } from "lucide-angular";
import { OperatorConfigSchema } from "@sanu/core/operator/config-schema";
import { RESIZE_CONFIG_SCHEMA } from "@sanu/operators/resize/resize.config";

export enum OperatorType {

  RESIZE = 'RESIZE',

}

export interface OperatorMetadata {

  readonly type: OperatorType;

  readonly label: string;

  readonly icon: LucideIconData;

  readonly configSchema: OperatorConfigSchema<Record<string, unknown>>;

}

export const OPERATOR_METADATA: Record<OperatorType, OperatorMetadata> = {

  [OperatorType.RESIZE]: {
    type: OperatorType.RESIZE,
    label: 'Resize',
    icon: Move,
    configSchema: RESIZE_CONFIG_SCHEMA,
  },

};
