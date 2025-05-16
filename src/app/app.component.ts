import { Component, OnInit } from '@angular/core'; // Add OnInit here
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // Implement OnInit here
  title = 'resumify';
  isLoggedIn = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      const userData = localStorage.getItem('user');
      console.log(userData);

      // Optionally set isLoggedIn flag
      this.isLoggedIn = !!userData;
    }
  }
}
// This is the main component of the Angular application.
