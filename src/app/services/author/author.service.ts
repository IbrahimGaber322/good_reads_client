import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Author from '../../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }
  
  getAuthors(){
    return this.http.get<Author[]>('http://localhost:5000/authors/')
  }
  getAuthorDetails(id:string){
    return this.http.get<Author>(`http://localhost:5000/authors/${id}`)
  }
}
