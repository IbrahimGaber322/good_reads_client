import { Component, Input } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [AdminDeleteComponent],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent {
 categories: Category[] = [
    { _id: "1", name: "Category 1" },
    { _id: "2", name: "Category 2" },
    { _id: "3", name: "Category 3" },
  ];
  @Input() edit(category:Category){}
}
