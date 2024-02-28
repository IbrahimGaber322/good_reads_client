import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../interfaces/category';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css',
})
export class AdminCategoryComponent {
  @Input() categories: Category[] = [];
  @Input() category?: Category;
  @Input() close() {}
  @Input() token: string | null = null;
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  onSubmit() {
    this.categoryForm.markAllAsTouched();
    this.categoryService
      .addCategory(this.categoryForm.value, this.token)
      .subscribe({
        next: (response) => {
          this.categoryService.updateCategories();
          this.categoryForm.reset();
          this.close();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Category added successfully.',
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message,
          });
        },
      });
  }
}
