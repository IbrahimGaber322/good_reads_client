import { Component, Input, inject } from '@angular/core';
import { AdminBooksComponent } from '../../components/tables/admin-books/admin-books.component';
import { AdminCategoriesComponent } from '../../components/tables/admin-categories/admin-categories.component';
import { AdminAuthorsComponent } from '../../components/tables/admin-authors/admin-authors.component';
import { AdminUsersComponent } from '../../components/tables/admin-users/admin-users.component';
import { AdminTabs } from '../../interfaces/admin-tabs';
import { AdminBookComponent } from '../../components/forms/admin-book/admin-book.component';
import { AdminAuthorComponent } from '../../components/forms/admin-author/admin-author.component';
import { AdminCategoryComponent } from '../../components/forms/admin-category/admin-category.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Author from '../../interfaces/author';
import { Book } from '../../interfaces/book';
import { Category } from '../../interfaces/category';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token/token.service';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component';
import { BookService } from '../../services/book/book.service';
import { CategoryService } from '../../services/category/category.service';
import { AuthorService } from '../../services/author/author.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminBooksComponent,
    AdminCategoriesComponent,
    AdminAuthorsComponent,
    AdminUsersComponent,
    AdminBookComponent,
    AdminAuthorComponent,
    AdminCategoryComponent,
    AdminLoginComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  authors:Author[] = [];
  categories:Category[] = [];
  books:Book[] = [];
  token: string | null = null;
  user: User | null = null;
  active: AdminTabs = 'categories';
  create: Boolean = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private tokenService: TokenService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.token= this.tokenService.getToken();
      this.userService.getUser(this.token).subscribe((data) => (this.user = data));
    }
    this.authorService.getAuthors().subscribe((data) => (this.authors = data));
    this.authorService.authorUpdated$.subscribe(() =>
      this.authorService.getAuthors().subscribe((data) => (this.authors = data))
    );
    this.bookService.getAllBooks().subscribe(data=>this.books=data)
    this.bookService.bookUpdated$.subscribe(()=>this.bookService.getAllBooks().subscribe(data=>this.books=data))
    
    this.categoryService
      .getCategories()
      .subscribe((d) => (this.categories = d));
     this.categoryService.categoryUpdated$.subscribe(()=>this.categoryService.getCategories().subscribe(data=>this.categories=data))
  }

  open = (item?: Author | Book | Category) => {
    const modalRef = this.modalService.open(NgbdModalContent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.active = this.active;
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.authors = this.authors;
    modalRef.componentInstance.books = this.books;
    modalRef.componentInstance.categories = this.categories;
    modalRef.componentInstance.token = this.token;
  };

  setActive(table: AdminTabs) {
    this.active = table;
  }
}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [
    AdminBooksComponent,
    AdminCategoriesComponent,
    AdminAuthorsComponent,
    AdminUsersComponent,
    AdminBookComponent,
    AdminAuthorComponent,
    AdminCategoryComponent,
  ],
  template: `
    <div class="modal-body">
      @if (active==="books" ) {
      <app-admin-book [close]="close" [token]="token" [book]="item" [categories]="categories" [authors]="authors" [books]="books"  />
      } @else if(active==="categories"){
      <app-admin-category [close]="close" [token]="token" [categories]="categories" />
      } @else if (active==="authors") {
      <app-admin-author [close]="close" [token]="token" [author]="item" [authors]="authors" />
      } @else if (active==="users") {
      <app-admin-users />
      }
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  close = () => this.activeModal.close('Close click');

  @Input() active: string = 'categories';
  @Input() item?: any;
  @Input() categories:Category[] =[];
  @Input() authors:Author[] =[];
  @Input() books:Book[] =[];
  @Input() token: string | null = null;
  
}

//check when closing
