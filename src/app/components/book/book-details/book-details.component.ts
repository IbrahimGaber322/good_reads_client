import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  books:any[]=
     [
      {
        "id": 1,
        "image": "https://example.com/book1.jpg",
        "name": "Book 1",
        "categoryId": 101,
        "authorId": 201,
        "description": "Description for Book 1"
      },
      {
        "id": 2,
        "image": "https://example.com/book2.jpg",
        "name": "Book 2",
        "categoryId": 102,
        "authorId": 202,
        "description": "Description for Book 2"
      },
      {
        "id": 3,
        "image": "https://example.com/book3.jpg",
        "name": "Book 3",
        "categoryId": 103,
        "authorId": 203,
        "description": "Description for Book 3"
      },
      {
        "id": 4,
        "image": "https://example.com/book4.jpg",
        "name": "Book 4",
        "categoryId": 101,
        "authorId": 204,
        "description": "Description for Book 4"
      },
      {
        "id": 5,
        "image": "https://example.com/book5.jpg",
        "name": "Book 5",
        "categoryId": 102,
        "authorId": 205,
        "description": "Description for Book 5"
      }
    ]

    bookDetails:any
    constructor(private activeroute:ActivatedRoute,private bookRequests:BookService ){}
    ngOnInit(){
      const id=+this.activeroute.snapshot.params['id']
     this.bookDetails=this.books.find((book:any)=>book.id===id)
  
    
  
  }
  
 
  

}
