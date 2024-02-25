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
    AdminLoginComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  user:User | null = null;
  active: AdminTabs = 'categories';
  create: Boolean = false;

  constructor(private modalService :NgbModal, private userService:UserService, private tokenService:TokenService){};

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const token = this.tokenService.getToken();
      this.userService.getUser(token).subscribe((data) => (this.user = data));
    }
  }

  open = (item?:Author|Book|Category) => {
    const modalRef = this.modalService.open(NgbdModalContent, {backdrop:"static"});
    modalRef.componentInstance.active = this.active;
    modalRef.componentInstance.item = item;
  }

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
            <app-admin-book [close]="close" [book]="item"  />
            } @else if(active==="categories"){
            <app-admin-category [close]="close"  />
            } @else if (active==="authors") {
            <app-admin-author [close]="close" />
            } @else if (active==="users") {
            <app-admin-users />
            }
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);

  close = ()=> this.activeModal.close('Close click');

  @Input() active: string = 'categories';
  @Input() item?:any;
}


//check when closing