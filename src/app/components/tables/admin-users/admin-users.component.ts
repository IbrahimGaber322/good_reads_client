import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagingConfig } from '../../../interfaces/paging-config';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [NgFor, NgxPaginationModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  @Input() users: User[] = [];
  constructor(private modalService: NgbModal) {}
  @Input() token: string | null = null;
  pagingConfig: PagingConfig = {} as PagingConfig;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  @Input() usersCount!: number;
  @Input() fetchUsers(page: number = 1, limit: number = 10) {}
  ngOnInit() {
    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.usersCount,
    };
  }
  onTableDataChange(event: any) {
    this.pagingConfig.currentPage = event;
    this.fetchUsers(event, this.itemsPerPage);
  }

  makeAdmin(user: User) {
    const modalRef = this.modalService.open(NgbdModalContent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.user = user;
  }
}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-body">
      <p>Are you sure you want to make {{ user.email }} admin ?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-primary" (click)="close()">
        No
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        (click)="handleAccept()"
      >
        Yes
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() user!: User;
  constructor(private activeModal: NgbActiveModal) {}
  close = () => this.activeModal.close('Close click');
  handleAccept() {
    this.activeModal.close('Close click');
  }
}
