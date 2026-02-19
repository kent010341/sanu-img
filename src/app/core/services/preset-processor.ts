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

import { Injectable } from '@angular/core';
import { PresetConfig } from '@sanu/core/preset/preset-config';
import { PresetType } from '@sanu/core/preset/preset-metadata';
import { OperatorFactory } from '@sanu/core/operator/operator-factory';
import { PipelineProcessor } from '@sanu/core/services/pipeline-processor';
import { ImageOperator } from '@sanu/core/operator/image-operator';
import { TELEGRAM_STICKER_CONFIG } from '@sanu/presets/telegram-sticker/telegram-sitcker.config';
import { TELEGRAM_STICKER_ICON_CONFIG } from '@sanu/presets/telegram-sticker-icon/telegram-sitcker.config';

/**
 * Registry of all available preset configurations
 */
const PRESET_CONFIG_REGISTRY: Record<PresetType, PresetConfig> = {
  [PresetType.TELEGRAM_STICKER]: TELEGRAM_STICKER_CONFIG,
  [PresetType.TELEGRAM_STICKER_ICON]: TELEGRAM_STICKER_ICON_CONFIG,
};

/**
 * Service for applying preset configurations to the image pipeline.
 * Presets are predefined operator chains for common image processing tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class PresetProcessor {

  constructor(
    private readonly operatorFactory: OperatorFactory,
    private readonly pipelineProcessor: PipelineProcessor
  ) {}

  /**
   * Apply a preset to the current pipeline by appending its operators.
   * Existing operators in the pipeline will be preserved.
   * 
   * @param presetType The type of preset to apply
   * @throws Error if the preset type is not found
   */
  applyPreset(presetType: PresetType): void {
    const presetConfig = PRESET_CONFIG_REGISTRY[presetType];
    
    if (!presetConfig) {
      throw new Error(`Unknown preset type: ${presetType}`);
    }

    // Create operator instances from the preset template
    const operators: ImageOperator[] = presetConfig.operators.map(template => {
      const operator = this.operatorFactory.createOperator(template.type);
      operator.config = template.config;
      operator.enable = template.enabled;
      return operator;
    });

    // Append to the current pipeline
    operators.forEach(operator => {
      this.pipelineProcessor.appendOperator(operator);
    });
  }

}
