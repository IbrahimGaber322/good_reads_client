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
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  registerForm: FormGroup;
  submitted: boolean = false;
  imageUrl: string | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.type)) {
      this.registerForm.patchValue({ image: file });
      this.setImageUrl(file);
    }
  }

  setImageUrl(image: string | File) {
    if (typeof image === 'string') {
      this.imageUrl = image;
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(image);
    }
  }
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirm: [
        '',
        [Validators.required, this.confirmPasswordValidator('password')],
      ],
      image: [null],
    });
  }
  handleFormSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.registerForm.get('firstname')!.value);
      formData.append('lastName', this.registerForm.get('lastname')!.value);
      formData.append('email', this.registerForm.get('email')!.value);
      formData.append('password', this.registerForm.get('password')!.value);
      formData.append('image', this.registerForm.get('image')!.value);
      const formDataObject: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      this.authService.signup(formData).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Account created successfully, please confirm via link sent to ${this.registerForm.value.email}.`,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message,
          });
        },
      });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const isLengthValid = password.length >= 8;
      const containsUpperCase = /[A-Z]/.test(password);
      const containsDigit = /\d/.test(password);
      const isValid = isLengthValid && containsUpperCase && containsDigit;

      return isValid ? null : { passwordRequirements: true };
    };
  }

  confirmPasswordValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const passwordControl = control.parent?.get(passwordControlName);

      return password === passwordControl?.value
        ? null
        : { passwordMismatch: true };
    };
  }
}
