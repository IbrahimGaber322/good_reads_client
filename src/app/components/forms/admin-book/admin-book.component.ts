import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book/book.service';
import { TokenService } from '../../../services/token/token.service';
import { AuthorService } from '../../../services/author/author.service';
import Author from '../../../interfaces/author';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-admin-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-book.component.html',
  styleUrl: './admin-book.component.css',
})
export class AdminBookComponent {
  @Input() close() {}
  @Input() book?: Book;
  bookForm: FormGroup;
  imageUrl: string | null = null;

  @Input() books: Book[] = [];
  @Input() categories: Category[] = [];
  @Input() authors: Author[] = [];
  @Input() token: string|null = null;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: [null, Validators.required],
      category: [null, Validators.required],
      description: [''],
      image: [null],
    });
  }

  ngOnInit() {
    if (this.book) {
      this.bookForm.patchValue(this.book);
      this.setImageUrl(this.book.image as File);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.type)) {
      this.bookForm.patchValue({ image: file });
      this.setImageUrl(file);
    }
  }

  setImageUrl(image: string | File) {
    if (typeof image === 'string') {
      this.imageUrl = image;
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(image);
    }
  }
  onSubmit() {
    this.bookForm.markAllAsTouched();
    console.log(this.bookForm.value.image);
    if (this.bookForm.valid && this.token) {
      const formData = new FormData();
      formData.append('name', this.bookForm.get('name')!.value);
      formData.append('author', this.bookForm.get('author')!.value._id);
      formData.append('category', this.bookForm.get('category')!.value._id);
      formData.append('description', this.bookForm.get('description')!.value);
      formData.append('image', this.bookForm.get('image')!.value);
      console.log(this.token);
      let request$;
      if (this.book) {
        const formValues = this.bookForm.value;
        const isChanged = Object.keys(formValues).some(
          (key) => this.book && formValues[key] !== this.book[key as keyof Book]
        );

        if (!isChanged) {
          this.bookForm.reset();
          this.close();
          return;
        }
        request$ = this.bookService.updateBook(
          formData,
          this.token,
          this.book._id
        );
      } else {
        request$ = this.bookService.addBook(
          formData,
          this.token
        );
      }

      request$.subscribe(() => {
        this.bookForm.reset();  
        this.bookService.updateBooks();
        this.close();
      });
    }
  }
}
