import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm : FormGroup
  
  isLengthValid!: boolean;
  containsLowerAndUpper! : boolean
  containsDigitAndSpecialChar!: boolean

  constructor(private fb : FormBuilder){
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      password:['',[Validators.required,this.passwordValidator()]],
    })
    }
    
    handleFormSubmit(){
      console.log(this.loginForm)
    //   if (this.loginForm.valid) {
    //     const formData = this.loginForm.value;
  
    //     this.http.post('https://ourbackend.com/users', formData)
    //     .pipe(
    //       tap(response => {
    //         console.log(response);
    //       }),
    //       catchError(error => {
    //         console.error(error);
    //         return of(null); 
    //       }),
    //     )
    //     .subscribe();
    // }
    }

    passwordValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const password = control.value;
         this.isLengthValid = password.length >= 8;
         this.containsLowerAndUpper = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);
        this.containsDigitAndSpecialChar = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/.test(password);
    
        const isValid = this.isLengthValid && this.containsLowerAndUpper && this.containsDigitAndSpecialChar;
        return isValid ? null : { 'passwordRequirements': true };
      };
    }
    

}


  
