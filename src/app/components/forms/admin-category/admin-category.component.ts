import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css',
})
export class AdminCategoryComponent {
  @Input() setCreate(bool: Boolean) {}
  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      this.categoryForm.reset();
      this.setCreate(false);
    }
  }
}
