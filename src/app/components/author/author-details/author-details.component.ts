import { AuthorService } from './../../../services/author/author.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import Author from '../../../interfaces/author';
import { AuthorBooksCardComponent } from '../author-books-card/author-books-card.component';
import { BookService } from '../../../services/book/book.service';
import { Book } from '../../../interfaces/book';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [AuthorBooksCardComponent,NgIf],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
 authorDetails!:Author
 authorBooks!:Book[]

  constructor(private ActivatedRoute:ActivatedRoute,private authorService:AuthorService,private bookRequests:BookService ){}

  ngOnInit(){
    const id=this.ActivatedRoute.snapshot.params['id']
   this.authorService.getAuthorDetails(id).subscribe((res:Author)=>this.authorDetails=res) 
   this.bookRequests.getAuthorBooks(id).subscribe((res:any)=>this.authorBooks = res.books)
  }
}
  
