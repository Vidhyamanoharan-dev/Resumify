import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../../home/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-contactus',
  imports: [CommonModule, RouterModule, FooterComponent,ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  contactForm: FormGroup;
  messageSent = false;
  name: any;
  email: any;
  subject: any;
  message: any;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Submit form
  onSubmit() {
    if (this.contactForm.valid) {
      this.messageSent = true; // Show success message
      // Reset the form after submission
      this.contactForm.reset();

      // Hide the success message after 3 seconds
      setTimeout(() => {
        this.messageSent = false;
      }, 3000);
    }
  }

  // Getter for easy access to form fields for validation
  get f() {
    return this.contactForm.controls;
  }
}
