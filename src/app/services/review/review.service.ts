import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:5000/reviews';
  
  constructor(private http: HttpClient) {}
  
  addBookReview(bookId:string,text:string ,token: string | null){
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    const body = {
      text,
    };
    return this.http.post(`${this.apiUrl}/${bookId}`,body,{headers});{
    }
  }
 
}
