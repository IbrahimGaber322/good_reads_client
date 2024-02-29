import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const isLengthValid = password.length >= 8;
      const containsLowerAndUpper = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
      const containsDigitAndSpecialChar = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(password);

      const isValid = isLengthValid && containsLowerAndUpper && containsDigitAndSpecialChar;
      return isValid ? null : { 'passwordRequirements': true };
    };
  }

  onSubmit() {
    // console.log(this.loginForm);
    if (this.loginForm.invalid) {

      return;
    }

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };



    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/userbooks']);
        } 
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }}
