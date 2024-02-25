import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
@Input() mybook!:Book
showDescription: boolean = false;
constructor(private router : Router){}

redirctToDetails(id:string){
  this.router.navigate(['books',id])
  }

}
