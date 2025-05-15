import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectedfiles.component.html',
  styleUrls: ['./selectedfiles.component.scss']
})
export class SelectedFilesComponent {
  fileName: string = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as { fileName?: string };
    if (state?.fileName) {
      this.fileName = state.fileName;
    }
  }

  onSelectNewFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.fileName = file.name;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  continue() {
    this.router.navigate(['/parsedresumes'], { state: { fileName: this.fileName } });
  }
}
