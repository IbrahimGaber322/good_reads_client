import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Author from '../../interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://good-reads-server.onrender.com/authors';
  private authorUpdatedSource = new Subject<void>();

  authorUpdated$ = this.authorUpdatedSource.asObservable();
  constructor(private http: HttpClient) {}

  getAuthors(page: number = 1, limit: number = 10, params: any = {}) {
    if (page !== undefined) {
      params = { ...params, page: page.toString() };
    }
    if (limit !== undefined) {
      params = { ...params, limit: limit.toString() };
    }
    return this.http.get<{ authors: Author[]; authorsCount: number }>(
      this.apiUrl,
      { params }
    );
  }
  getAuthorDetails(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  updateAuthors() {
    this.authorUpdatedSource.next();
  }

  addAuthor(data: FormData, token: String) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post<Author>(this.apiUrl, data, { headers });
  }

  updateAuthor(data: FormData, token: String, bookId: string) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.patch<Author>(`${this.apiUrl}/${bookId}`, data, {
      headers,
    });
  }
  deleteAuthor(id: string, token: string | null) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.delete<Author>(`${this.apiUrl}/${id}`, { headers });
  }
}
