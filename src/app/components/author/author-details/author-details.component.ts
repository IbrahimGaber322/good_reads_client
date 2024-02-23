import { AuthorService } from './../../../services/author/author.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import Author from '../../../interfaces/author';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
 authorDetails!:Author
  constructor(private ActivatedRoute:ActivatedRoute,private authorService:AuthorService ){}

  ngOnInit(){
    const id=this.ActivatedRoute.snapshot.params['id']
   this.authorService.getAuthorDetails(id).subscribe((res:any)=>this.authorDetails=res) 
  }
}
