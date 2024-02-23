import { Component, Input } from '@angular/core';
import Author from '../../../interfaces/author';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {
  @Input() myauthor!:Author
constructor(private router:Router){}

redirectToDetails(id:string){
  this.router.navigate(['authors',id])
}
}
