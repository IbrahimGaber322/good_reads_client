import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://good-reads-server.onrender.com/users';

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

  signup(data: Object): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  confirm(token: String): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.apiUrl}/confirm/${token}`);
  }
}
