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
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent {
 books:Book[] = [];
 Categories:Category[]=[];
  @Input() edit(book:Book){}

  constructor(private bookService:BookService){}

  ngOnInit(){
    this.bookService.getAllBooks().subscribe(data=>this.books=data)
    this.bookService.bookUpdated$.subscribe(()=>this.bookService.getAllBooks().subscribe(data=>this.books=data))
    
  }

}
