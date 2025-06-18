import { Component } from '@angular/core';
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

  constructor(
    private router: Router,
    private resumeTransferService: ResumeTransferService
  ) {}

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const files = event.dataTransfer?.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.type === 'application/pdf');
      if (validFiles.length > 0) {
        this.selectedFiles = validFiles;
        this.resumeTransferService.setFiles(validFiles);
        this.router.navigate(['/selectedfiles'], { state: { fileNames: validFiles.map(f => f.name) } });
      }
    }
  }

  onBrowseFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => file.type === 'application/pdf');
      if (validFiles.length > 0) {
        this.selectedFiles = validFiles;
        this.resumeTransferService.setFiles(validFiles);
        this.router.navigate(['/selectedfiles'], { state: { fileNames: validFiles.map(f => f.name) } });
      }
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  clearDragOver() {
    this.dragOver = false;
  }
}
