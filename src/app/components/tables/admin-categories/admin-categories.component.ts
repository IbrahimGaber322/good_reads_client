import { Component, Input } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import { PagingConfig } from '../../../interfaces/paging-config';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [AdminDeleteComponent, NgFor, NgxPaginationModule],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css',
})
export class AdminCategoriesComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  @Input() categoriesCount!: number;
  @Input() categories: Category[] = [];
  @Input() fetchCategories(page: number = 1, limit: number = 10) {}
  @Input() token: string | null = null;
  @Input() edit(category: Category) {}
  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor() {
    console.log(this.categoriesCount);
  }
  ngOnInit() {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.categoriesCount,
    };
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchCategories(event, this.itemsPerPage);
  }
}
