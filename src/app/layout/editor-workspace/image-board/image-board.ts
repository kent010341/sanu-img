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

import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { LucideAngularModule, Upload, Image as ImageIcon } from 'lucide-angular';

@Component({
  selector: 'app-image-board',
  imports: [LucideAngularModule],
  templateUrl: './image-board.html',
  styleUrl: './image-board.scss'
})
export class ImageBoard {

  protected readonly fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  
  protected readonly Upload = Upload;
  protected readonly Image = ImageIcon;
  
  protected readonly selectedImage = signal<string | null>(null);
  protected readonly isDragging = signal(false);
  protected readonly imageInfo = signal<{
    width: number;
    height: number;
    format: string;
  } | null>(null);

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

  private loadImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      this.selectedImage.set(dataUrl);
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        // Get format from MIME type
        const format = file.type.split('/')[1].toUpperCase();
        
        this.imageInfo.set({
          width: img.width,
          height: img.height,
          format: format
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }
}
