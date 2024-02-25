import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5000/books';
  private bookUpdatedSource = new Subject<void>();

  bookUpdated$ = this.bookUpdatedSource.asObservable();
  constructor(private http: HttpClient) {}

  updateBooks() {
    this.bookUpdatedSource.next();
  }
  getAllBooks(id?: string): Observable<Book[]> {
    let url = this.apiUrl;
    if(id){
      url = url + `?category=${id}`;
    }
    return this.http.get<Book[]>(url);
  }
  getAuthorBooks(Id: string){
    return this.http.get<Book[]>( `${this.apiUrl}/?author=${Id}`)
  }
  getBookDetails(id: string) {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
  addBook(data: FormData, token: String) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post<Book>(this.apiUrl, data, { headers });
  }
  updateBook(data: FormData, token: String, bookId: string) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.patch<Book>(`${this.apiUrl}/${bookId}`, data, { headers });
  }
  deleteBook(id: string, token: String) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.delete<Book>(`${this.apiUrl}/${id}`, { headers });
  }
}
