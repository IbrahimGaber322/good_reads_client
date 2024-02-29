import { Book } from './../../../interfaces/book';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { TokenService } from '../../../services/token/token.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
@Input() mybook!:Book
token: string | null = null;
user!:User
userBooks!:Book[]
showDescription: boolean = false;
constructor(private router : Router,private userService:UserService ,private tokenService:TokenService){}
ngOnInit() {
  if (typeof localStorage !== 'undefined') {
    this.tokenService.authToken$.subscribe((token) => (this.token = token));
    };
  }

redirctToDetails(id:string){
  this.router.navigate(['books',id])
  }
  getuser(){
    this.userService.getUser(this.token).subscribe((res)=>{this.user=res;
    this.userBooks=res.books.map((item)=>item.bookId)
    })
  }
addBook(bookId:string,event:Event){
  this.userService.addUserBook(bookId,this.token).subscribe((res)=>console.log(res))
  event.stopPropagation();
}
bookExist(){
  console.log(this.userBooks)
   return this.userBooks.some((book)=>book._id==this.mybook._id )
}
}
