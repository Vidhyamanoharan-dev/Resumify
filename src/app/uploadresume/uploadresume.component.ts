import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.scss']
})
export class BrowseResumeComponent {
  selectedFile: File | null = null;
  dragOver = false;

  constructor(private router: Router) {}

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.router.navigate(['/selectedfiles'], { state: { fileName: file.name } });
    }
  }

  onBrowseFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.router.navigate(['/selectedfiles'], { state: { fileName: file.name } });
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
