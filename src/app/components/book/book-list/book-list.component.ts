import { Component } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../../services/book/book.service';
import { Book } from '../../../interfaces/book';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { PagingConfig } from '../../../interfaces/paging-config';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent,NgxPaginationModule,NgFor],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  books!: Book[];
  bookCount: number = 0;

  pagingConfig: PagingConfig = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.fetchbooks();
    this.bookService.bookUpdated$.subscribe(()=>this.fetchbooks())
  }
  fetchbooks(page: number = 1, limit: number = 5) {
    this.bookService.getAllBooks(page, limit).subscribe((data) => {
      this.books = data.books;
      this.bookCount = data.booksCount;
      this.pagingConfig = {
        itemsPerPage: limit,
        currentPage: page,
        totalItems: this.bookCount,
      };
    });
  }
  onTableDataChange(page: number) {
    this.pagingConfig.currentPage = page;
    this.fetchbooks(page, this.pagingConfig.itemsPerPage);
  }
}
