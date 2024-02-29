import { ActivatedRoute } from '@angular/router';
import { CategoryCardComponent } from './../category-card/category-card.component';
import { CategoryService } from './../../../services/category/category.service';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent, NgFor],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories!: Category[];
  currentPage: number = 1;

  constructor(
    private CategoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.currentPage = this.activatedRoute.snapshot.queryParams['page'] || 1;
    this.loadCategories(this.currentPage);
  }

  loadCategories(page: number): void {
    this.CategoryService.getCategories(page, 5).subscribe((data) => {
      this.categories = data.categories;
    });
  }

  onPaginationChange(page: number): void {
    this.currentPage = page;
    this.loadCategories(this.currentPage);
  }
}
