import { ActivatedRoute } from '@angular/router';
import { CategoryCardComponent } from './../category-card/category-card.component';
import { CategoryService } from './../../../services/category/category.service';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagingConfig } from '../../../interfaces/paging-config';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryCardComponent, NgFor, NgxPaginationModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  categories: Category[] = [];
  categoryCount: number = 0;

  pagingConfig: PagingConfig = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(page: number = 1, limit: number = 5) {
    this.categoryService.getCategories(page, limit).subscribe((data) => {
      this.categories = data.categories;
      this.categoryCount = data.categoriesCount;
      this.pagingConfig = {
        itemsPerPage: limit,
        currentPage: page,
        totalItems: this.categoryCount,
      };
    });
  }

  onTableDataChange(page: number) {
    this.pagingConfig.currentPage = page;
    this.fetchCategories(page, this.pagingConfig.itemsPerPage);
  }
}
