import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-books-card',
  standalone: true,
  imports: [],
  templateUrl: './author-books-card.component.html',
  styleUrl: './author-books-card.component.css'
})
export class AuthorBooksCardComponent {
  @Input() myauthorbook!:Book
  constructor(    private router: Router,){}
  redirctTobook(id: string) {
    this.router.navigate(['books', id]);
  }
}
