import { Component } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';
import { AuthorService } from '../../../services/author/author.service';
import Author from '../../../interfaces/author';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagingConfig } from '../../../interfaces/paging-config';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorCardComponent, NgxPaginationModule, NgFor],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
})
export class AuthorListComponent {
  authors!: Author[];
  authorCount: number = 0;

  pagingConfig: PagingConfig = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };
  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.fetchauthors(1, 5, params);
    });
    this.fetchauthors();
  }
  fetchauthors(page: number = 1, limit: number = 5, params: any = {}) {
    this.authorService.getAuthors(page, limit, params).subscribe({
      next: (data) => {
        this.authors = data.authors;
        this.authorCount = data.authorsCount;
        this.pagingConfig = {
          itemsPerPage: limit,
          currentPage: page,
          totalItems: this.authorCount,
        };
      },
      error: console.log,
    });
  }
  onTableDataChange(page: number) {
    this.pagingConfig.currentPage = page;
    this.fetchauthors(page, this.pagingConfig.itemsPerPage);
  }
}
