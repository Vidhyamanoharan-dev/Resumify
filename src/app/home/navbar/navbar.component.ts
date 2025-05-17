import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;
  userId: string | null = null;

  constructor(private authService: AuthService,private router: Router,) {
    this.userId = this.authService.getUserId();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.userId = null;
    this.router.navigate(['/login']);

  }

    onUploadResumeClick() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/browse']);
    } else {
      alert('Please login first to upload resume.');
      this.router.navigate(['/login']);
    }
  }

}
