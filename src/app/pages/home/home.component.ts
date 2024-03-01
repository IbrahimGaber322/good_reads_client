import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token/token.service';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../interfaces/book';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagingConfig } from '../../interfaces/paging-config';
import { LoggedOutHomeComponent } from '../../components/logged-out-home/logged-out-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    NgFor,
    FormsModule,
    NgxPaginationModule,
    LoggedOutHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activeStatus: 'All' | 'Want to read' | 'Read' | 'Currently Reading' = 'All';
  user: User | null = null;
  token: string | null = null;
  userBooks: Book[] = [];
  booksCount!: number;

  pagingConfig: PagingConfig = {} as PagingConfig;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchUserBooks(event, this.itemsPerPage);
  }
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private bookService: BookService,
    private router: Router
  ) {}
  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.tokenService.authToken$.subscribe((token) => (this.token = token));
      this.userService.getUser(this.token).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.booksCount,
    };
    this.fetchUserBooks();
  }

  fetchUserBooks(page: number = 1, limit: number = 5, params: any = {}) {
    this.userService.getUserBooks(this.token, page, limit, params).subscribe({
      next: (data) => {
        this.userBooks = data.books.map((book: any) => ({
          ...book.bookId,
          shelve: book.shelve,
          _id: book._id,
        }));
        this.booksCount = data.booksCount;
        if (params.shelve) {
          this.activeStatus = params.shelve;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSelectStat(shelve: 'All' | 'Want to read' | 'Read' | 'Currently Reading') {
    if (!(shelve === 'All')) {
      this.fetchUserBooks(1, 5, { shelve });
    } else {
      this.fetchUserBooks();
    }
  }

  updateBookStatus(
    bookId: string,
    status: 'Want to read' | 'Read' | 'Currently Reading' = 'Want to read'
  ) {
    this.userService
      .updateUserBookStatus(bookId, status, this.token)
      .subscribe({
        next: () => {
          this.onSelectStat(status);
        },
        error: console.log,
      });
  }
  goToBookDetails(bookId: any) {
    this.router.navigate(['books', bookId]);
    console.log(this.userBooks);
  }
  goToAuthorDetails(authorId: string) {
    this.router.navigate(['authors', authorId]);
  }
}
