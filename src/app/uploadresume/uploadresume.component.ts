import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.scss']
})
export class UploadResumeComponent {

  file: File | null = null;
  errorMessage: string = '';

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.validateAndSetFile(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];
      this.validateAndSetFile(file);
    }
  }

  validateAndSetFile(file: File) {
    if (file.type !== 'application/pdf') {
      this.file = null;
      this.errorMessage = 'Only PDF files are allowed!';
    } else {
      this.file = file;
      this.errorMessage = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  uploadFile() {
    if (!this.file) {
      this.errorMessage = 'Please upload a PDF file.';
      return;
    }

    // Upload logic here
    alert('File uploaded: ' + this.file.name);
  }
}
