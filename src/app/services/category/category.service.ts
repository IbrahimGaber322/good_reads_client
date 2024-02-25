import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories';
  constructor(private http:HttpClient) { }
getCategories(page?:number,limit?:number){
  let params = {};
  if (page !== undefined) {
    params = { ...params, page: page.toString() };
  }
  if (limit !== undefined) {
    params = { ...params, limit: limit.toString() };
  }
  return this.http.get<Category[]>('http://localhost:5000/categories/',{params:params})
}
getCategoryDetails(id:string){
  return this.http.get<Category>(`http://localhost:5000/categories/${id}`)
}
}
