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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NgFor, FormsModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
    private bookService: BookService
  ) {}
  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.tokenService.authToken$.subscribe((token) => (this.token = token));
      this.userService.getUser(this.token).subscribe((data) => {
        this.user = data;
      });
    }
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.booksCount,
    };
    this.fetchUserBooks();
  }

  fetchUserBooks(page: number = 1, limit: number = 1) {
    this.userService.getUserBooks(this.token, page, limit).subscribe((data) => {
      this.userBooks = data.books.map((book: any) => ({
        ...book.bookId,
        shelve: book.shelve,
        _id: book._id,
      }));
      this.booksCount = data.booksCount;
      console.log(data.books);
    });
  }

  logUser() {
    console.log(this.user);
  }
  updateBookStatus(bookId: string, newStatus: string = '') {
    this.userService
      .updateUserBookStatus(bookId, newStatus, this.token)
      .subscribe((res: any) => console.log(res));
  }
}
