import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink,ReviewsComponent,NgFor],
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
    "description": "Description for Book 1",
    "reviews": [
      {"username": "User1", "comment": "Great book!"},
      {"username": "User2", "comment": "Awesome read!"}
    ]
  },
  {
    "id": 2,
    "image": "https://example.com/book2.jpg",
    "name": "Book 2",
    "categoryId": 102,
    "authorId": 202,
    "description": "Description for Book 2",
    "reviews": [
      {"username": "User3", "comment": "Highly recommended."},
      {"username": "User4", "comment": "Couldn't put it down!"}
    ]
  },
  {
    "id": 3,
    "image": "https://example.com/book3.jpg",
    "name": "Book 3",
    "categoryId": 103,
    "authorId": 203,
    "description": "Description for Book 3",
    "reviews": [
      {"username": "User5", "comment": "Fantastic plot."},
      {"username": "User6", "comment": "Must-read for everyone!"}
    ]
  },
  {
    "id": 4,
    "image": "https://example.com/book4.jpg",
    "name": "Book 4",
    "categoryId": 101,
    "authorId": 204,
    "description": "Description for Book 4",
    "reviews": [
      {"username": "User7", "comment": "Enjoyed every page."},
      {"username": "User8", "comment": "Looking forward to more from this author!"}
    ]
  },
  {
    "id": 5,
    "image": "https://example.com/book5.jpg",
    "name": "Book 5",
    "categoryId": 102,
    "authorId": 205,
    "description": "Description for Book 5",
    "reviews": [
      {"username": "User9", "comment": "Couldn't recommend it more."},
      {"username": "User10", "comment": "A literary gem!"}
    ]
  }
]

    bookDetails:any
    constructor(private activeroute:ActivatedRoute,private bookRequests:BookService ){}
    ngOnInit(){
      const id=+this.activeroute.snapshot.params['id']
     this.bookDetails=this.books.find((book:any)=>book.id===id)
  
    
  
  }
  
 
  

}
