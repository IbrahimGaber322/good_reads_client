import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import { BookService } from '../../../services/book/book.service';
import { Category } from '../../../interfaces/category';
import { PagingConfig } from '../../../interfaces/paging-config';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [AdminDeleteComponent, NgFor, NgxPaginationModule],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css',
})
export class AdminBooksComponent {
  @Input() books: Book[] = [];
  @Input() token: string | null = null;
  @Input() edit(book: Book) {}
  pagingConfig: PagingConfig = {} as PagingConfig;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  @Input() booksCount: number=0;
  @Input() fetchBooks(page: number = 1, limit: number = 10) {}
  ngOnInit() {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.booksCount,
    };
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchBooks(event, this.itemsPerPage);
  }
}
