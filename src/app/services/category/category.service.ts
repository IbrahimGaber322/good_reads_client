import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories';
  constructor(private http:HttpClient) { }
getCategories():Observable<Category[]>{
  return this.http.get<Category[]>(this.apiUrl);
}
getCategoryDetails(id:string){
  return this.http.get(`${this.apiUrl}/${id}`)
}
}
