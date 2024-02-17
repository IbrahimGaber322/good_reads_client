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

  constructor(private fb : FormBuilder,private http : HttpClient){
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.pattern("^\S+$")]],
      password:['',[Validators.required,this.passwordValidator()]],
    })
    }
    
    handleFormSubmit(){
      console.log(this.loginForm)
      if (this.loginForm.valid) {
        const formData = this.loginForm.value;
  
        this.http.post('https://ourbackend.com/users', formData)
        .pipe(
          tap(response => {
            console.log(response);
          }),
          catchError(error => {
            console.error(error);
            return of(null); 
          }),
        )
        .subscribe();
    }
    }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      const isLengthValid = password.length >= 8;
      const containsLowerCase = /[a-z]/.test(password);
      const containsUpperCase = /[A-Z]/.test(password);
      const containsDigit = /\d/.test(password);
      const containsSpecialChar =/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
      const isValid =
        isLengthValid &&
        containsLowerCase &&
        containsUpperCase &&
        containsDigit &&
        containsSpecialChar;
      return isValid ? null : { 'passwordRequirements': true };
    };
  }

}


  
