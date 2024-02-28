import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';
  constructor(private http: HttpClient) {}

  getUser(token: string | null): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }

  getUserBooks(token: string | null): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<User>(`${this.apiUrl}/books`, { headers });
  }
  updateUserBookStatus(bookId: string, newStatus: FormData, token: string | null): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    const body = {
      bookId,
      newStatus,
    };
    return this.http.patch<User>(`${this.apiUrl}/books`, body, { headers });
  }
}

