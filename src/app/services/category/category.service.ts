import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/categories';
  constructor(private http: HttpClient) {}
  private categoryUpdatedSource = new Subject<void>();

  categoryUpdated$ = this.categoryUpdatedSource.asObservable();

  updateCategories() {
    this.categoryUpdatedSource.next();
  }

  addCategory(data: Category, token: string|null) {
    const headers = new HttpHeaders({ authorization: `Bearer ${token}` });
    return this.http.post<Category>(this.apiUrl, data, { headers });
  }

  getCategories(page?: number, limit?: number) {
    let params = {};
    if (page !== undefined) {
      params = { ...params, page: page.toString() };
    }
    if (limit !== undefined) {
      params = { ...params, limit: limit.toString() };
    }
    return this.http.get<Category[]>(this.apiUrl, {
      params: params,
    });
  }
  getCategoryDetails(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }
}
