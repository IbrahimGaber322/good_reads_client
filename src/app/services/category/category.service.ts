import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
getCategories(){
  return this.http.get('http://localhost:5000/categories/')
}
getCategoryDetails(id:string){
  return this.http.get(`http://localhost:5000/categories/${id}`)
}
}
