import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  signup(userInfo: {
    firstName: string;
    lastName: string;
    image:string;
    email: string;
    password: string;
  }): Observable<{ message:string }> {
    return this.http.post<{ message:string }>(`${this.apiUrl}/signup`, userInfo);
  }

  confirm(token: String): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.apiUrl}/confirm/${token}`);
  }
}
