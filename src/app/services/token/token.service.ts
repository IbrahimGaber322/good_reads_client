import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'https://ourbackend.com/users';
  token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) { 
    this.token.next(localStorage.getItem("user"));
  }
  logIn(){
    let newToken = null;
    this.http.get<string>(`${this.apiUrl}/login`).subscribe(d=>newToken=d);
    if(newToken){
      this.token.next(newToken);
      localStorage.setItem("user",newToken);
    }
  }
}
