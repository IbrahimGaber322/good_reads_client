import { Component } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../../services/book/book.service';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
books!:Book[]

  constructor(private bookRequests:BookService){}


ngOnInit(){
  this.bookRequests.getBooks().subscribe((res:any)=>this.books=res.books)
}
}
