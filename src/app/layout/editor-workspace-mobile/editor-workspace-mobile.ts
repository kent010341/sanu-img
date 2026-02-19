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

import { Component, signal } from '@angular/core';
import { ImageBoard } from '@sanu/layout/editor-workspace/image-board/image-board';
import { MobileOperatorToolbar } from './mobile-operator-toolbar/mobile-operator-toolbar';
import { MobileFlowPreview } from './mobile-flow-preview/mobile-flow-preview';

@Component({
  selector: 'app-editor-workspace-mobile',
  imports: [
    ImageBoard,
    MobileOperatorToolbar,
    MobileFlowPreview,
  ],
  templateUrl: './editor-workspace-mobile.html',
  styleUrl: './editor-workspace-mobile.scss'
})
export class EditorWorkspaceMobile {

  protected readonly isFlowExpanded = signal<boolean>(false);

  toggleFlowPanel(): void {
    this.isFlowExpanded.update(expanded => !expanded);
  }

}
