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

import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { OPERATOR_METADATA, OperatorType } from '@sanu/core/operator/operator-metadata';
import { PRESET_METADATA, PresetType } from '@sanu/core/preset/preset-metadata';
import { OperatorFactory } from '@sanu/core/operator/operator-factory';
import { PipelineProcessor } from '@sanu/core/services/pipeline-processor';
import { PresetProcessor } from '@sanu/core/services/preset-processor';
import { SimpleIcon } from 'simple-icons';

@Component({
  selector: 'app-mobile-operator-toolbar',
  imports: [LucideAngularModule],
  templateUrl: './mobile-operator-toolbar.html',
  styleUrl: './mobile-operator-toolbar.scss'
})
export class MobileOperatorToolbar {

  private readonly operatorFactory = inject(OperatorFactory);
  private readonly pipelineProcessor = inject(PipelineProcessor);
  private readonly presetProcessor = inject(PresetProcessor);

  protected readonly activeTab = signal<'operators' | 'presets'>('operators');
  protected readonly operatorTypes = Object.values(OperatorType);
  protected readonly presetTypes = Object.values(PresetType);
  protected readonly OPERATOR_METADATA = OPERATOR_METADATA;
  protected readonly PRESET_METADATA = PRESET_METADATA;

  protected toggleMode(): void {
    this.activeTab.update(current => current === 'operators' ? 'presets' : 'operators');
  }

  protected addOperator(operatorType: OperatorType): void {
    const operator = this.operatorFactory.createOperator(operatorType);
    this.pipelineProcessor.appendOperator(operator);
  }

  protected addPreset(presetType: PresetType): void {
    this.presetProcessor.appendPreset(presetType);
  }

  protected isSimpleIcon(presetType: PresetType): boolean {
    const icon = PRESET_METADATA[presetType].icon;
    return 'path' in icon && 'hex' in icon;
  }

  protected getSimpleIconPath(presetType: PresetType): string {
    return (PRESET_METADATA[presetType].icon as SimpleIcon).path;
  }

  protected getLucideIcon(presetType: PresetType): LucideIconData {
    return PRESET_METADATA[presetType].icon as LucideIconData;
  }

}
