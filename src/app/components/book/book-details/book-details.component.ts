import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { NgFor } from '@angular/common';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink,ReviewsComponent,NgFor],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
 
    bookDetails!:any
    constructor(private activeroute:ActivatedRoute,private bookRequests:BookService ){}
    ngOnInit(){
      const id=this.activeroute.snapshot.params['id']
      this.bookRequests.getBookDetails(id).subscribe((res:any)=>this.bookDetails = res)
    }
  
 
  

}
