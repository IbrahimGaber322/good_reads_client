import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../interfaces/user';
import { Book } from '../../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://good-reads-server.onrender.com/users';
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

  getUserBooks(
    token: string | null,
    page: number = 1,
    limit: number = 10,
    params: any = {}
  ): Observable<{ books: Book[]; booksCount: number }> {
    if (page !== undefined) {
      params = { ...params, page: page.toString() };
    }
    if (limit !== undefined) {
      params = { ...params, limit: limit.toString() };
    }
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.get<{ books: Book[]; booksCount: number }>(
      `${this.apiUrl}/books`,
      { headers, params }
    );
  }
  updateUserBookStatus(
    bookId: string,
    status: string,
    token: string | null
  ): Observable<User> {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    const body = {
      bookId,
      status,
    };
    return this.http.patch<User>(`${this.apiUrl}/books`, body, { headers });
  }
  addUserBook(bookId: string, token: string | null) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post<User>(
      `${this.apiUrl}/books`,
      { bookId },
      { headers }
    );
  }
  
  confirmUser(token: string | null) {
    return this.http.get(`${this.apiUrl}/confirm/${token}`);
  }
  makeAdmin(userId: String, admin: boolean, token: string | null) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.patch(`${this.apiUrl}`, { userId, admin }, { headers });
  }
}
