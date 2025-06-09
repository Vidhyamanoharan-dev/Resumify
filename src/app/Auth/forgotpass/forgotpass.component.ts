
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  imports:[ReactiveFormsModule,CommonModule],
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})

export class ForgotpassComponent {
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  isModalVisible: boolean = true;

  step: 'email' | 'code' | 'reset' = 'email';
  emailValue: string = '';


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router)  {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  sendCode() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      this.http.post('/api/setEmail', { email }).subscribe({
        next: () => {
          this.emailValue = email;
          this.step = 'code';
        },
        error: (err) => alert(err.error),
      });
    }
  }



  verifyCode() {
    if (this.codeForm.valid) {
      const code = this.codeForm.value.code;
      this.http.post('/api/setCode', { email: this.emailValue, code }).subscribe({
        next: () => this.step = 'reset',
        error: (err) => alert(err.error),
      });
    }
  }

  resetPassword() {
    const { password, confirmPassword } = this.passwordForm.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.http.post('/api/newpassword', {
      email: this.emailValue,
      password,
    }).subscribe({
      next: () => {
        alert('Password updated successfully!');
        this.step = 'email';
        this.emailForm.reset();
        this.codeForm.reset();
        this.passwordForm.reset();
      },
      error: (err) => alert(err.error),
    });
  }

  open(){
    console.log('Modal opened');
    this.isModalVisible = true;
    this.step = 'email';
    this.emailForm.reset();
    this.codeForm.reset();
    this.passwordForm.reset();
    this.router.navigate(['/forgot-password']); // Navigate to the forgot password page
  }

  close() {
    console.log('Modal closed');
    this.isModalVisible = false;
    this.step = 'email';
    this.emailForm.reset();
    this.codeForm.reset();
    this.passwordForm.reset();
    this.router.navigate(['/login']); // Go to login page
  }

}


// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   imports: [ReactiveFormsModule, CommonModule],
//   standalone: true,
//   selector: 'app-forgot-password',
//   templateUrl: './forgotpass.component.html',
//   styleUrls: ['./forgotpass.component.scss'],
// })
// export class ForgotpassComponent {
//   emailForm: FormGroup;
//   verificationForm: FormGroup;
//   resetForm: FormGroup;

//   step: 'email' | 'code' | 'reset' = 'email';
//   emailValue: string = '';
//   generatedCode: string = '123456';

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.emailForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//     });

//     this.verificationForm = this.fb.group({
//       code: ['', [Validators.required, Validators.minLength(6)]],
//     });

//     this.resetForm = this.fb.group({
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//     });
//   }

//   get email() {
//     return this.emailForm.get('email');
//   }

//   sendCode() {
//     if (this.emailForm.valid) {
//       const email = this.emailForm.value.email;
//       console.log('Sending code to:', email);

//       // Simulated API call
//       // Replace with actual API call if backend is ready
//       this.emailValue = email;
//       this.step = 'code';
//       alert(`Verification code sent to ${email}. Use code: ${this.generatedCode}`);
//     }
//   }

//   verifyCode() {
//     const enteredCode = this.verificationForm.value.code;
//     console.log('Entered code:', enteredCode);

//     if (enteredCode === this.generatedCode) {
//       console.log('Code verified. Proceeding to password reset.');
//       this.step = 'reset';
//     } else {
//       console.log('Invalid code entered.');
//       alert('❌ Invalid verification code');
//     }
//   }

//   resetPassword() {
//     const { password, confirmPassword } = this.resetForm.value;

//     if (password !== confirmPassword) {
//       alert('❌ Passwords do not match');
//       return;
//     }

//     console.log('✅ Password reset simulated for:', this.emailValue);
//     console.log('New Password:', password);

//     alert('✅ Password reset successful!');
//     this.resetAll();
//   }

//   resetAll() {
//     this.step = 'email';
//     this.emailForm.reset();
//     this.verificationForm.reset();
//     this.resetForm.reset();
//   }
// }




