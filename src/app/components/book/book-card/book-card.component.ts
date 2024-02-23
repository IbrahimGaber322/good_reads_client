import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
@Input() mybook!:Book
constructor(private router : Router){}

redirctToDetails(id:string){
  this.router.navigate(['books',id])

}
}
