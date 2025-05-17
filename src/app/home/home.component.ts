// home.component.ts
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,private authService: AuthService,  private snackBar: MatSnackBar
) {}

navigateToBrowse(): void {
  const loggedIn = this.authService.isLoggedIn();
  console.log('Is user logged in?', loggedIn);

  if (!loggedIn) {
    alert('⚠️ Please login first.');
    return;
  }

  console.log('Navigating to /browse');
  this.router.navigate(['/browse']);
}
}
