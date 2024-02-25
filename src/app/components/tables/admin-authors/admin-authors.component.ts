import { Component, Input } from '@angular/core';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import Author from '../../../interfaces/author';
import { Category } from '../../../interfaces/category';
import { AuthorService } from '../../../services/author/author.service';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [AdminDeleteComponent],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css'
})
export class AdminAuthorsComponent {
  authors:Author[] = [];
  Categories:Category[]=[];
   @Input() edit(author:Author){}
 
   constructor(private authorService:AuthorService){}
 
   ngOnInit(){
     this.authorService.getAuthors().subscribe(data=>this.authors=data);
     this.authorService.authorUpdated$.subscribe(()=>this.authorService.getAuthors().subscribe(data=>this.authors=data));
   }
}
