import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-author-books-card',
  standalone: true,
  imports: [],
  templateUrl: './author-books-card.component.html',
  styleUrl: './author-books-card.component.css'
})
export class AuthorBooksCardComponent {
  @Input() myauthorbook!:Book
}
