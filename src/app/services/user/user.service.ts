import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';
  constructor(private http: HttpClient) {}

  private userUpdatedSource = new Subject<void>();

  userUpdated$ = this.userUpdatedSource.asObservable();

  updateUsers() {
    this.userUpdatedSource.next();
  }

  getUser(token: string | null): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }

  getAllUsers(token: string | null, page: number = 1, limit: number = 10) {
    let params = {};
    if (page !== undefined) {
      params = { ...params, page: page.toString() };
    }
    if (limit !== undefined) {
      params = { ...params, limit: limit.toString() };
    }
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<{ users: User[]; usersCount: number }>(this.apiUrl, {
      headers,
      params,
    });
  }

  getUserBooks(token: string | null): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<User>(`${this.apiUrl}/books`, { headers });
  }
  updateUserBookStatus(
    bookId: string,
    newStatus: FormData,
    token: string | null
  ): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    const body = {
      bookId,
      newStatus,
    };
    return this.http.patch<User>(`${this.apiUrl}/books`, body, { headers });
  }
}
