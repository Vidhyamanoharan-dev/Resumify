import { Component } from '@angular/core';
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
      const newFiles = Array.from(input.files).filter(file => file.type === 'application/pdf');
      this.selectedFiles.push(...newFiles);
      this.resumeTransferService.setFiles(this.selectedFiles);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.resumeTransferService.setFiles(this.selectedFiles);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  goBack(): void {
    this.router.navigate(['/']);
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

    // 👇 Match Spring Boot @RequestParam("file") MultipartFile[] format
    this.selectedFiles.forEach(file => {
      formData.append('file', file);
    });

    this.loadingService.setLoading(true);

    this.uploadService.uploadResume(userId, formData).subscribe({
      next: (res) => {
        console.log('Upload successful:', res);
        this.resumeTransferService.clearFiles();
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
