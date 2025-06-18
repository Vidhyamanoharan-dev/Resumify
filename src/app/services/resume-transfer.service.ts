import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeTransferService {
  private files: File[] = [];

  setFiles(files: File[]): void {
    this.files = files;
  }

  getFiles(): File[] {
    return this.files;
  }

  clearFiles(): void {
    this.files = [];
  }
}
