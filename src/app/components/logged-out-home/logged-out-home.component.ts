import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NgIf, NgFor } from '@angular/common';

import { Router } from '@angular/router';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; // Import NgbCarouselModule
import { AuthService } from '../../services/auth/auth.service';
import { Book } from '../../interfaces/book';
import { BookCardComponent } from '../book/book-card/book-card.component';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-logged-out-home',
  standalone: true,
  imports: [
    NgbModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    BookCardComponent,
    NgbCarouselModule,
  ],
  templateUrl: './logged-out-home.component.html',
  styleUrl: './logged-out-home.component.css',
})
export class LoggedOutHomeComponent {
  submitted: boolean = false;
  showLogin: boolean = false;
  books!: Book[];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.bookService
      .getAllBooks(1, 3)
      .subscribe({
        next: (res) => (this.books = res.books),
        error: console.log,
      });
  }
}
