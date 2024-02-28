import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import { BookService } from '../../../services/book/book.service';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [AdminDeleteComponent],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css',
})
export class AdminBooksComponent {
  @Input() books: Book[] = [];
  @Input() token: string | null = null;
  @Input() edit(book: Book) {}

  constructor() {}

  ngOnInit() {}
}
