import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserbooksService } from '../../services/userbooks/userbooks.service';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.css'
})
export class UserBooksComponent implements OnInit {

  books!:any[]
  filteredBooks!:any[];
  constructor(private userbookservice:UserbooksService){}

ngOnInit() {
  this.userbookservice.getUserBooks().subscribe(
    (res: any) => {
      this.books = res;
      this.filteredBooks = this.books;
      console.log(this.filteredBooks);
    },
    (error) => {
      console.error('Error fetching user books:', error);
    }
  );
}



filterBooksByStatus(event: any) {
  const status = event.target.value;
  if (status === 'All') {
    this.filteredBooks = this.books;
  } else {
    this.filteredBooks = this.books.filter(book => book.status === status);
  }
}

updateBookStatus(event: any, bookId: string) {
  const newStatus = event.target.value;
  this.userbookservice.updateBookStatus(bookId, newStatus).subscribe(
    () => {
      // this.ngOnInit();
      console.log(newStatus);
    },
    (error) => {
      console.error('Error updating book status:', error);
    }
  );
}






}
