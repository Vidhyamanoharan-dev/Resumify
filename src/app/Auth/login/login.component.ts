import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordService } from '../../services/forgotpass.service'; // update the path

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
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // 6-digit code
    });

    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  togglePasswordVisibility() {
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
          console.error('Login failed:', err);
        },
      });
    }
  }

  openForgotPasswordModal(event: Event) {
    event.preventDefault();
    this.showForgotPasswordModal = true;
    this.step = 1;
  }
  onForgotPasswordSubmit() {
    if (this.step === 1) {
      const email = this.emailForm.value.email;
      this.forgotPasswordService.sendCode(email).subscribe({
        next: () => {
          alert('Verification code sent to your email');
          this.step = 2;


        },
        error: (err) => {
          console.error('Error sending code:', err);
          alert('Failed to send code');
        }
      });
    } else if (this.step === 2) {
      const email = this.emailForm.value.email;
      const code = this.codeForm.value.code;
      this.forgotPasswordService.verifyCode(email, code).subscribe({
        next: (res) => {
          console.log('OTP verified successfully');
          this.step = 3;
        },
        error: (err) => {
          console.log(email, code);

          console.error('Invalid code:', err);
          alert('Invalid code');
        }
      });
    } else if (this.step === 3) {
      const email = this.emailForm.value.email;
      const newPassword = this.resetForm.value.newPassword;
      const confirmPassword = this.resetForm.value.confirmPassword;

      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.forgotPasswordService.resetPassword(email, newPassword).subscribe({
        next: () => {
          alert('Password reset successful');
          this.showForgotPasswordModal = false;
          this.step = 1;
        },
        error: (err) => {
          console.error('Reset error:', err);
          alert('Failed to reset password');
        }
      });
    }
  }


}
