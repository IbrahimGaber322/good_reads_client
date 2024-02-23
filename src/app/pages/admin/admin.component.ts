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
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  active: AdminTabs = 'categories';
  create: Boolean = false;

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, {backdrop:"static"});
    modalRef.componentInstance.active = this.active;
  }

  setActive(table: AdminTabs) {
    this.active = table;
  }
  setCreate = (bool: Boolean) => {
    this.create = bool;
  };
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
            <app-admin-book [close]="close"  />
            } @else if(active==="categories"){
            <app-admin-category   />
            } @else if (active==="authors") {
            <app-admin-author  />
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
}


//check when closing