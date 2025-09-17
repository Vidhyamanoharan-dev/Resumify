import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResumeTransferService } from '../services/resume-transfer.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browseresume.component.html',
  styleUrls: ['./browseresume.component.scss']
})
export class BrowseResumeComponent {
  selectedFiles: File[] = [];
  dragOver = false;
  isDragging = false;

  constructor(
    private router: Router,
    private resumeTransferService: ResumeTransferService
  ) { }

  // ✅ Drag-and-drop handler
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const files = event.dataTransfer?.files;
    if (files) this.handleFiles(files);
  }

  // ✅ Input selection handler
  onBrowseFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.handleFiles(input.files);
  }

  // ✅ Main file processor
  private handleFiles(fileList: FileList) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const pdfFiles = Array.from(fileList).filter(
      file => file.type === 'application/pdf' && file.size <= maxSize
    );

    if (pdfFiles.length === 0) {
      alert('Only PDF files under 5MB are allowed.');
      return;
    }

    this.selectedFiles = pdfFiles;

    if (pdfFiles.length === 1) {
      this.resumeTransferService.setFile(pdfFiles[0]);
      this.router.navigate(['/selectedfiles'], {
        state: { fileName: pdfFiles[0].name }
      });
    } else {
      this.resumeTransferService.setFiles(pdfFiles);
      this.router.navigate(['/selectedfiles'], {
        state: { fileNames: pdfFiles.map(f => f.name) }
      });
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  clearDragOver() {
    this.dragOver = false;
  }

  // 👇 Optional drag-and-drop UI feedback
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.onFileDropped(event);
  }
}
