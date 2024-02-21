import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private authToken: string | null = null;
  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.authToken = localStorage.getItem(this.TOKEN_KEY);
    }
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.authToken = token;
  }

  getToken = (): string | null => {
    return this.authToken;
  };

  clearToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.authToken = null;
  }
}
