import { CategoryCardComponent } from './../category-card/category-card.component';
import { CategoryService } from './../../../services/category/category.service';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent,NgFor],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
categories:any

constructor(private CategoryService:CategoryService){}

ngOnInit(){
  this.CategoryService.getCategories().subscribe((data:any)=>this.categories=data)
}
}