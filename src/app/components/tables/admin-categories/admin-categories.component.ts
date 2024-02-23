import { Component } from '@angular/core';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent {
 categories: Category[] = [
    { _id: "1", name: "Category 1" },
    { _id: "2", name: "Category 2" },
    { _id: "3", name: "Category 3" },
  ];
}
