// src/app/loading/loading.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/LoadingService';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((state: boolean) => {
      this.isLoading = state;
    });
  }
}
