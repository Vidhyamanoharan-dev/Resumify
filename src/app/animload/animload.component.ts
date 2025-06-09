import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-animload',
  templateUrl: './animload.component.html',
  styleUrls: ['./animload.component.scss'],
  imports: [CommonModule]
})
export class AnimLoadingComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("AnimLoadingComponent loaded");
    setTimeout(() => {
      this.router.navigate(['/upload']);
    }, 9000);
  }


}
