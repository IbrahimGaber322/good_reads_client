import { Component, Input, inject } from '@angular/core';
import Author from '../../../interfaces/author';
import { Book } from '../../../interfaces/book';
import { Category } from '../../../interfaces/category';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../../../services/book/book.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-admin-delete',
  standalone: true,
  imports: [],
  templateUrl: './admin-delete.component.html',
  styleUrl: './admin-delete.component.css',
})
export class AdminDeleteComponent {
  @Input() item!: Author | Book | Category;
  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(NgbdModalContent, {
      backdrop: 'static',
    });
    modalRef.componentInstance.item = this.item;
    modalRef.componentInstance.type = this.getItemType();
  }

  getItemType(): string {
    if (typeof this.item === 'object' && this.item !== null) {
      if ('description' in this.item) {
        return 'Book';
      } else if ('firstName' in this.item) {
        return 'Author';
      } else if ('name' in this.item) {
        return 'Category';
      }
    }
    return 'Unknown';
  }
}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-body">
      <p>Are you sure you want to delete {{ item.firstName || item.name }} ?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-primary"
        (click)="activeModal.close('Close click')"
      >
        No
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        (click)="handleDelete()"
      >
        Yes
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  @Input() item!: any;
  @Input() type!: string;
  token!: string | null;
  close = () => this.activeModal.close('Close click');
  constructor(
    private bookService: BookService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.tokenService.authToken$.subscribe((token) => (this.token = token));
  }
  handleDelete() {
    this.activeModal.close('Close click');
    if (this.type === 'Book') {
      this.bookService
        .deleteBook(this.item._id, this.token)
        .subscribe(() => this.bookService.updateBooks());
    }
  }
}
