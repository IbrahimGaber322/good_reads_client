import { TokenService } from './../../../services/token/token.service';
import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { NgFor } from '@angular/common';
import { Book } from '../../../interfaces/book';
import { FormsModule, } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ReviewService } from '../../../services/review/review.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink,ReviewsComponent,NgFor,FormsModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
 
    bookDetails!:Book
    token: string | null = null;
    userBooks!:Book
    reviewText: string = '';
    constructor(private activeroute:ActivatedRoute,private bookRequests:BookService,private tokenService:TokenService,private reviewservice:ReviewService){}
    
    ngOnInit(){
      if (typeof localStorage !== 'undefined') {
        this.tokenService.authToken$.subscribe((token) => (this.token = token));
      }
      const id=this.activeroute.snapshot.params['id']
      this.bookRequests.getBookDetails(id).subscribe((res)=>{this.bookDetails = res;console.log(res )})
    }
    addReview(bookId:string,reviewText: string){
    console.log(reviewText)
    console.log(bookId)
     this.reviewservice.addBookReview(bookId,reviewText,this.token) 
  }  

}
