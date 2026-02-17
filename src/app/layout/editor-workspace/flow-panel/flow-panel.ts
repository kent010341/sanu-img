/**
 * MIT License
 * 
 * Copyright (c) 2025 Kent010341
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

import { Component, inject } from '@angular/core';
import { OperatorInstance } from '@sanu/components/operator-instance/operator-instance';
import { PipelineProcessor } from '@sanu/core/services/pipeline-processor';

@Component({
  selector: 'app-flow-panel',
  imports: [OperatorInstance],
  templateUrl: './flow-panel.html',
  styleUrl: './flow-panel.scss'
})
export class FlowPanel {

  private readonly pipelineProcessor = inject(PipelineProcessor);

  protected readonly operators = this.pipelineProcessor.operators;

}
