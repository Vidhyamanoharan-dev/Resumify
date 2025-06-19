import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';
import { ResumeTransferService } from '../services/resume-transfer.service';
import { LoadingService } from '../services/LoadingService';


@Component({
  selector: 'app-selected-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectedfiles.component.html',
  styleUrls: ['./selectedfiles.component.scss']
})
export class SelectedFilesComponent {
  selectedFiles: File[] = [];
  isDragging = false;

  constructor(
    private router: Router,
    private uploadService: UploadService,
    private resumeTransferService: ResumeTransferService,
    private loadingService: LoadingService
  ) {
    const files = this.resumeTransferService.getFiles();
    if (files && files.length > 0) {
      this.selectedFiles = files;
    }

  }


  get fileNames(): string[] {
    return this.selectedFiles.map(file => file.name);
  }

  onSelectNewFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
    }
  }

  // 🔁 Reusable method for both drag/drop and browse
  addFiles(files: File[]): void {
    const supportedTypes = ['application/pdf'];
    const newFiles = files.filter(file =>
      supportedTypes.includes(file.type) &&
      !this.selectedFiles.some(f => f.name === file.name && f.size === file.size)
    );

    if (newFiles.length < files.length) {
      alert('Only PDF files are allowed, or some were already added.');
    }

    this.selectedFiles.push(...newFiles);
  }
  // 🖱️ Click Listener for file input


  // 🖱️ Drag/Drop Listeners
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

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.addFiles(Array.from(event.dataTransfer.files));
    }
  }

  removeFile(event: Event, index: number): void {
    event.stopPropagation(); // optional, to prevent click bubbling
    this.selectedFiles.splice(index, 1);
  }


  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  goBack(): void {
    this.router.navigate(['/up']);
  }

  continue(): void {
    if (this.selectedFiles.length === 0) {
      alert('No files selected!');
      return;
    }

    const userIdStr = localStorage.getItem('userId');
    if (!userIdStr) {
      alert('User ID not found. Please login again.');
      return;
    }

    const userId = Number(userIdStr);
    const formData = new FormData();

    this.selectedFiles.forEach(file => {
      formData.append('file', file); // Match backend param
    });

    this.loadingService.setLoading(true);

    this.uploadService.uploadResume(userId, formData).subscribe({
      next: (res) => {
        console.log('Upload successful:', res);
        this.resumeTransferService.clearFile();
        this.router.navigate(['/parsedresumes'], {
          state: { fileNames: this.fileNames }
        });
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('Failed to upload file(s)');
        this.loadingService.setLoading(false);
      }
    });
  }
}
