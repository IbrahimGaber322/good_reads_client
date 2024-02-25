import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http : HttpClient) { }
getBooks(Id?: string){
  const url = Id ? `http://localhost:5000/books/?category=${Id}` : 'http://localhost:5000/books/';
  return this.http.get<Book[]>(url)
}
getAuthorBooks(Id: string){
  return this.http.get<Book[]>( `http://localhost:5000/books/?author=${Id}`)
}
getBookDetails(id:string){
  return this.http.get<Book>(`http://localhost:5000/books/${id}`)
}
}
