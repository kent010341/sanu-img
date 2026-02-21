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

import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { PipelineProcessor } from '@sanu/core/services/pipeline-processor';
import { LucideAngularModule, Upload, Download, Image as ImageIcon } from 'lucide-angular';

@Component({
  selector: 'app-image-board',
  imports: [LucideAngularModule],
  templateUrl: './image-board.html',
  styleUrl: './image-board.scss'
})
export class ImageBoard {

  private readonly pipelineProcessor = inject(PipelineProcessor);

  protected readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  protected readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  
  protected readonly Upload = Upload;
  protected readonly Download = Download;
  protected readonly Image = ImageIcon;
  
  protected readonly isDragging = signal(false);

  protected readonly imageInfo = computed(() => {
    const bitmap = this.pipelineProcessor.result();
    if (bitmap == null) {
      return null;
    }
    return { width: bitmap.width, height: bitmap.height };
  });

  protected readonly canvasAspectRatio = computed(() => {
    const bitmap = this.pipelineProcessor.result();
    if (bitmap == null) {
      return null;
    }
    return `${bitmap.width} / ${bitmap.height}`;
  });

  private originalFileName: string | null = null;
  
  protected readonly hasImage = () => this.pipelineProcessor.result() !== null;

  constructor() {
    effect(() => {
      const bitmap = this.pipelineProcessor.result();
      if (bitmap == null) {
        return;
      }

      const canvasRef = this.canvas();
      if (canvasRef == null) {
        return;
      }

      const canvas = canvasRef.nativeElement;
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(bitmap, 0, 0);
    });
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.loadImage(input.files[0]);
    }
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.loadImage(file);
      }
    }
  }

  protected openFilePicker(): void {
    this.fileInput().nativeElement.click();
  }

  protected downloadImage(event: Event): void {
    event.stopPropagation();
    
    const canvasRef = this.canvas();
    if (!canvasRef) {
      return;
    }

    const canvas = canvasRef.nativeElement;
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Use original filename without extension, add .png
        const originalName = this.originalFileName;
        if (originalName) {
          const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
          link.download = `${nameWithoutExt}.png`;
        } else {
          link.download = 'output.png';
        }
        
        link.click();
        URL.revokeObjectURL(url);
      }, 
      'image/png'
    );
  }

  private loadImage(file: File): void {
    // Store the original filename
    this.originalFileName = file.name;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      
      // Create a Blob from the ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: file.type });
      
      // Convert to ImageBitmap
      const bitmap = await createImageBitmap(blob);
      
      // Set as source for pipeline processing
      this.pipelineProcessor.source.set(bitmap);
    };
    reader.readAsArrayBuffer(file);
  }
}
