import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailForm!: FormGroup;
  codeForm!: FormGroup;
  resetForm!: FormGroup;

  showForgotPasswordModal = false;
  step: 1 | 2 | 3 = 1;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });

    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Login failed!');
          console.error('Login error:', err);
        },
      });
    }
  }

  openForgotPasswordModal(event: Event): void {
    event.preventDefault();
    this.showForgotPasswordModal = true;
    this.step = 1;
    this.emailForm.reset();
    this.codeForm.reset();
    this.resetForm.reset();
  }

  closeForgotPasswordModal(): void {
    this.showForgotPasswordModal = false;
  }

  sendCode(): void {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.authService.sendResetCode(email).subscribe({
        next: () => {
          alert('Verification code sent to email.');
          this.step = 2;
        },
        error: (err) => {
          alert('Failed to send code.');
          console.error(err);
        },
      });
    }
  }

  verifyCode(): void {
    if (this.codeForm.valid) {
      const code = this.codeForm.value.code;
      this.authService.verifyResetCode(code).subscribe({
        next: () => {
          alert('Code verified. Proceed to reset password.');
          this.step = 3;
        },
        error: (err: any) => {
          alert('Invalid or expired code.');
          console.error(err);
        },
      });
    }
  }

  resetPassword(): void {
    if (this.resetForm.valid) {
      const { newPassword } = this.resetForm.value;
      this.authService.resetPassword(newPassword).subscribe({
        next: () => {
          alert('Password reset successfully. Please log in.');
          this.closeForgotPasswordModal();
        },
        error: (err: any) => {
          alert('Failed to reset password.');
          console.error(err);
        },
      });
    }
  }
}
