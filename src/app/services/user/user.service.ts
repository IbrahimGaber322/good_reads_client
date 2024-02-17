import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { TokenService } from '../token/token.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string | null = null;
  user: User | null = null;
  private apiUrl = 'https://ourbackend.com/users';
  constructor(private http: HttpClient, private tokenService: TokenService) {
    tokenService.token.subscribe((t) => (this.token = t));
  }
  fetchUserData(): void {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http
      .get<User>(`${this.apiUrl}/`, { headers })
      .subscribe((data) => (this.user = data));
  }
  getUser(): User | null {
    if (this.user) return this.user;
    this.fetchUserData();
    return this.user;
  }
}
