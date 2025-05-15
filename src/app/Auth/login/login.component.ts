import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[ReactiveFormsModule,CommonModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    onSubmit(): void {
        const credentials = this.loginForm.value;

      if (this.loginForm.valid) {

this.authService.login(credentials).subscribe(response => {
  console.log('Login successful:', response);

  // Save user ID or full object based on backend response
  localStorage.setItem('user', JSON.stringify(response));
  this.router.navigate(['/home']);
});

    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
