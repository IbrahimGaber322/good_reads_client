import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-book.component.html',
  styleUrl: './admin-book.component.css'
})
export class AdminBookComponent {
  @Input() close(){}
  bookForm: FormGroup;
  imageUrl: string|null = null;


  categoryOptions = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy'];
  authorOptions = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'];


  constructor(private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      image: [''],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.bookForm.patchValue({ image: this.imageUrl });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.bookForm.markAllAsTouched();
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
      this.bookForm.reset();
      this.close();
    }
  }
}
