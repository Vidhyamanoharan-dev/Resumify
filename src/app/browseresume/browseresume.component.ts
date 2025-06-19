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
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  dragOver = false;
  isDragging = false;

  constructor(
    private router: Router,
    private resumeTransferService: ResumeTransferService
  ) { }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const pdfFiles = Array.from(files).filter(f => f.type === 'application/pdf');

    if (pdfFiles.length === 1) {
      this.selectedFile = pdfFiles[0];
      this.resumeTransferService.setFile(this.selectedFile);
      this.router.navigate(['/selectedfiles'], {
        state: { fileName: this.selectedFile.name }
      });
    } else if (pdfFiles.length > 1) {
      this.selectedFiles = pdfFiles;
      this.resumeTransferService.setFiles(pdfFiles);
      this.router.navigate(['/selectedfiles'], {
        state: { fileNames: pdfFiles.map(f => f.name) }
      });
    } else {
      alert('Only PDF files are allowed.');
    }
  }

  onBrowseFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.resumeTransferService.setFile(file);
      console.log(file);
      this.router.navigate(['/selectedfiles'], {
        state: { fileName: file.name, data: file }
      });
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  clearDragOver() {
    this.dragOver = false;
  }

  // 🖱️ HostListeners
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

  // Optional utility if needed for batch uploads
  addFiles(files: File[]) {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      this.selectedFiles = pdfFiles;
      this.resumeTransferService.setFiles(pdfFiles);
      this.router.navigate(['/selectedfiles'], {
        state: { fileNames: pdfFiles.map(f => f.name) }
      });
    } else {
      alert('Only PDF files are allowed.');
    }
  }
}
