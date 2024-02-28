import { Component, Input } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [AdminDeleteComponent],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css',
})
export class AdminCategoriesComponent {
  @Input() categories: Category[] = [];
  @Input() token: string | null = null;
  @Input() edit(category: Category) {}
}
