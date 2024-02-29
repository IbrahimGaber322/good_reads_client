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
  categories!: Category[];
  categoryCount!: number;

  
  pagingConfig: PagingConfig = {} as PagingConfig;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchcategories(event, this.itemsPerPage);
  }

  constructor(
    private CategoryService: CategoryService,) {}
  ngOnInit(): void {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.categoryCount,
    };
    this.fetchcategories();
  }

  fetchcategories(page: number = 1, limit: number = 5) {
      this.CategoryService.getCategories( page, limit).subscribe((data) => {
        this.categories = data.categories;     
        this.categoryCount = data.categoriesCount;

        console.log(data)
    });
  }
}
