import { Component, Input } from '@angular/core';
import { AdminDeleteComponent } from '../../forms/admin-delete/admin-delete.component';
import Author from '../../../interfaces/author';
import { Category } from '../../../interfaces/category';
import { AuthorService } from '../../../services/author/author.service';
import { PagingConfig } from '../../../interfaces/paging-config';
import { DatePipe, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [AdminDeleteComponent, NgFor, NgxPaginationModule, DatePipe],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.css',
})
export class AdminAuthorsComponent {
  @Input() authors: Author[] = [];
  @Input() token: string | null = null;
  @Input() edit(author: Author) {}
  pagingConfig: PagingConfig = {} as PagingConfig;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  @Input() authorsCount!: number;
  @Input() fetchAuthors(page: number = 1, limit: number = 10) {}
  ngOnInit() {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.authorsCount,
    };
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchAuthors(event, this.itemsPerPage);
  }
}
