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

import { OperatorType } from "@sanu/core/operator/operator-metadata";
import { PresetType } from "@sanu/core/preset/preset-metadata";
import { ConfigType } from "@sanu/core/utils/types";

/**
 * Template for an operator within a preset.
 * Defines the operator type, its configuration, and initial enabled state.
 */
export interface PresetOperatorTemplate {
  /** The type of operator to create */
  type: OperatorType;
  
  /** The configuration for the operator */
  config: ConfigType;
  
  /** Whether the operator should be enabled by default */
  enabled: boolean;
}

/**
 * Configuration for a preset, defining a sequence of operators to apply.
 */
export interface PresetConfig {
  /** The preset type identifier */
  type: PresetType;
  
  /** Ordered list of operators to create and configure */
  operators: PresetOperatorTemplate[];
}
