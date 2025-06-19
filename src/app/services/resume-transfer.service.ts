import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeTransferService {
  private files: File[] = [];

  // ✅ For multiple files
  setFiles(files: File[]): void {
    this.files = files;
  }

  getFiles(): File[] {
    return this.files;
  }

  clearFiles(): void {
    this.files = [];
  }

  // ✅ Optional: for single file compatibility
  setFile(file: File): void {
    this.files = [file];
  }

  getFile(): File | null {
    return this.files.length > 0 ? this.files[0] : null;
  }

  clearFile(): void {
    this.files = [];
  }
}
