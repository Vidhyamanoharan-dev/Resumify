import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports:[ReactiveFormsModule,CommonModule],
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})




export class ForgotpassComponent {

  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Reset link sent to:', email);
      // TODO: Call backend API here

    }
  }
}
