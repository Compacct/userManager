import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 
  private router = inject(Router);

  private fb = inject(FormBuilder);
  @ViewChild('errorModal') errorModalRef!: ElementRef;
  // Show/Hide password toggle logic
  showPassword = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  togglePassword() {
      this.showPassword = !this.showPassword;
    }
  onSubmit() {
    // Check if form is INVALID
    if (this.loginForm.invalid) {
      this.showErrorModal(); // <--- Trigger the modal here
    } else {
        this.router.navigate(['/dashboard'])
    }
  }

  showErrorModal() {
    const modalElement = this.errorModalRef.nativeElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  get f() { return this.loginForm.controls; }
}
