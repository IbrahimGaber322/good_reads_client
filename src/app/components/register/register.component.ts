import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup
  submitted: boolean = false;
  constructor(private fb : FormBuilder,private authService:AuthService){
    this.registerForm=this.fb.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,this.passwordValidator()]],
      confirm:['',[Validators.required,this.confirmPasswordValidator('password')]]
    })
 }
 handleFormSubmit(){
  console.log(this.registerForm)
  this.submitted = true;
  if(this.registerForm.valid){
    const formData = new FormData();
    formData.append('firstName', this.registerForm.get('firstname')!.value);
    formData.append('lastName', this.registerForm.get('lastname')!.value);
    formData.append('email', this.registerForm.get('email')!.value);
    formData.append('password', this.registerForm.get('password')!.value);
    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);

     this.authService.signup(formData).subscribe({
       next:(data)=>{
        console.log(data)
       }
     })
  }
}

passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const isLengthValid = password.length >= 8;
    const containsUpperCase = /[A-Z]/.test(password);
    const containsDigit = /\d/.test(password);
    const isValid = isLengthValid && containsUpperCase && containsDigit;

    return isValid ? null : { 'passwordRequirements': true };
  };
}

confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.value;
    const passwordControl = control.parent?.get(passwordControlName);

    return password === passwordControl?.value ? null : { 'passwordMismatch': true };
  };
}
}
