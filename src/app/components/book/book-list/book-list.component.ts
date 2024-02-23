import { Component } from '@angular/core';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../../services/book/book.service';
import { Book } from '../../../interfaces/book';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent,],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
books!:Book[]

  constructor(private bookService:BookService){}


ngOnInit(){
  this.bookService.getBooks().subscribe((res:any)=>this.books=res)

}
}
