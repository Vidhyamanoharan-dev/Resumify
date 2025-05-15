import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-enhancing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-enhancing.component.html',
  styleUrls: ['./resume-enhancing.component.scss'],
})
export class ResumeEnhancingComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate resume parsing delay
    setTimeout(() => {
      this.router.navigate(['/parsed-resumes']);
    }, 3000);
  }

  navigateManually() {
    this.router.navigate(['/parsed-resumes']);
  }
}
