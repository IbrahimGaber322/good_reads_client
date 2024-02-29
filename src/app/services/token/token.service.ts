import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private authTokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.authTokenSubject.next(localStorage.getItem(this.TOKEN_KEY));
    }
  }

  get authToken$() {
    return this.authTokenSubject.asObservable();
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
      this.authTokenSubject.next(token);
    } else {
      console.error('localStorage is not available.');
    }
  }

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      this.authTokenSubject.next(null);
    } else {
      console.error('localStorage is not available.');
    }
  }
}
