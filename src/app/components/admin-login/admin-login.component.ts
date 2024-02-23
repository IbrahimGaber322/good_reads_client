import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/token/token.service';


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

  constructor(private fb : FormBuilder, private authService:AuthService, private tokenService:TokenService){
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
    }
    
    handleFormSubmit(){
      if(this.loginForm.valid){
        console.log(this.loginForm.value)
        this.authService.login(this.loginForm.value).subscribe(data=>{
          if(data.token){
            this.tokenService.setToken(data.token);
          }
        })
      }
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


  
