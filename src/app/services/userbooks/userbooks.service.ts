import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserbooksService {

  constructor(private http: HttpClient) { }
  getUserBooks():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/books/');
  }

  updateBookStatus(bookId: string, newStatus: string):Observable<any[]> {
    return this.http.patch<any[]>(`http://localhost:3000/books/${bookId}`, { status: newStatus });
  }

}
