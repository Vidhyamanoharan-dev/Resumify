import { Component } from '@angular/core';

@Component({
  selector: 'app-uploadresume',
  imports: [],
  templateUrl: './uploadresume.component.html',
  styleUrl: './uploadresume.component.scss'
})
export class UploadresumeComponent {

   uploadedFileName: string | null = null;
     alertMessage: string | null = null;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;


  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

handleFile(file: File): void {
  const isPDF = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  if (!isPDF) {
    alert('Only PDF files are allowed. Please upload a .pdf file.');
    this.uploadedFileName = null;
    return;
  }

  this.alertMessage = null;
  this.uploadedFileName = file.name;
  console.log('Valid PDF uploaded:', file);
  // You can now upload this file to a server or whatever you want
}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

    triggerFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }
  closeAlert(): void {
    this.alertMessage = null;
  }


}
