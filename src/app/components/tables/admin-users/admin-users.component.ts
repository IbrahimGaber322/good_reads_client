import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  users: User[] = [];
  constructor(private modalService: NgbModal) {}

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
