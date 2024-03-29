import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/token/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  isLengthValid!: boolean;
  containsLowerAndUpper!: boolean;
  containsDigitAndSpecialChar!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleFormSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data:any) => {
          if (data.token) {
            this.tokenService.setToken(data.token);
            this.router.navigate(['/']);
          }else{
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: data.message,
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error.message,
          });
        },
      });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      this.isLengthValid = password.length >= 8;
      this.containsLowerAndUpper = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
      this.containsDigitAndSpecialChar =
        /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(password);

      const isValid =
        this.isLengthValid &&
        this.containsLowerAndUpper &&
        this.containsDigitAndSpecialChar;
      return isValid ? null : { passwordRequirements: true };
    };
  }
}
