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

import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, Trash2 } from 'lucide-angular';
import { ImageOperator } from '@sanu/core/operator/image-operator';
import { OPERATOR_METADATA } from '@sanu/core/operator/operator-metadata';
import { ConfigFieldSchema } from '@sanu/core/operator/config-schema';
import { PipelineProcessor } from '@sanu/core/services/pipeline-processor';

@Component({
  selector: 'app-operator-instance',
  imports: [LucideAngularModule],
  templateUrl: './operator-instance.html',
  styleUrl: './operator-instance.scss'
})
export class OperatorInstance {

  private readonly pipelineProcessor = inject(PipelineProcessor);

  readonly operator = input.required<ImageOperator>();

  protected readonly Eye = Eye;
  protected readonly EyeOff = EyeOff;
  protected readonly Trash2 = Trash2;

  protected readonly metadata = computed(() => {
    const op = this.operator();
    return OPERATOR_METADATA[op.type];
  });

  protected readonly config = computed(() => {
    return this.operator().config();
  });

  protected readonly enabled = computed(() => {
    return this.operator().enable();
  });

  protected readonly configFields = computed(() => {
    const schema = this.metadata().configSchema;
    return Object.values(schema) as ConfigFieldSchema[];
  });

  protected getValue(key: string): unknown {
    const config = this.config();
    return config[key];
  }

  protected updateConfig(key: string, value: string, type: 'number' | 'text'): void {
    const operator = this.operator();
    const currentConfig = operator.config();
    
    let parsedValue: unknown;
    
    if (type === 'text') {
      // For text fields, use the string value directly (null if empty)
      parsedValue = value === '' ? null : value;
    } else if (type === 'number') {
      // For number fields, parse as number
      const numValue = Number(value);
      parsedValue = value === '' || isNaN(numValue) ? null : numValue;
    }
    
    operator.config.set({
      ...currentConfig,
      [key]: parsedValue
    });
  }

  protected toggleEnable(): void {
    const operator = this.operator();
    operator.enable.set(!operator.enable());
  }

  protected remove(): void {
    const operator = this.operator();
    this.pipelineProcessor.removeOperator(operator.id);
  }

}
