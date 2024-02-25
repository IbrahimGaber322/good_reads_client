import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() mycategory!:Category
constructor(private router:Router){}
  
redirctToDetails(id:string){
    this.router.navigate(['categories',id])
    }
  
}
