import { Category } from './../../../interfaces/category';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { BookCardComponent } from '../../book/book-card/book-card.component';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-category-books',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './category-books.component.html',
  styleUrl: './category-books.component.css',
})
export class CategoryBooksComponent {
  categoryBooks!: Book[];
  constructor(
    private activeroute: ActivatedRoute,
    private bookRequests: BookService
  ) {}
  ngOnInit() {
    const id = this.activeroute.snapshot.params['id'];
    this.bookRequests.getAllBooks(1, 10, { category: id }).subscribe({
      next: (res) => {
        this.categoryBooks = res.books;
      },
      error: console.log,
    });
  }
}
