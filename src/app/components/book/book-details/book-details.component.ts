import { ReviewsComponent } from './../reviews/reviews.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../../../services/book/book.service';
import { NgFor } from '@angular/common';
import { Book } from '../../../interfaces/book';
import { FormsModule, } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../services/token/token.service';

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
    constructor(private activeroute:ActivatedRoute,private bookRequests:BookService,private userService:UserService,private tokenService:TokenService ){}
    
    ngOnInit(){
      const id=this.activeroute.snapshot.params['id']
      this.bookRequests.getBookDetails(id).subscribe((res)=>this.bookDetails = res)
      this.userService.getUserBooks(this.token)
    }
  
    updateBookStatus(bookId: string, newStatus: string = '') {
      this.userService
        .updateUserBookStatus(bookId, newStatus, this.token)
        .subscribe((res: any) => console.log(res));
    }
}
