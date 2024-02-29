import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token/token.service';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,NgFor,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: User | null = null;
  token: string|null = null;
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private bookService : BookService
    ) {}
  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.tokenService.authToken$.subscribe(token=> this.token=token);
      this.userService.getUser(this.token).subscribe((data) => {this.user = data; });
    }
    this.userService.getUserBooks("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGY0ZTk0OTExYTg4YmEyY2MwNDU5MSIsImlhdCI6MTcwOTE1NjMwOSwiZXhwIjoxNzA5MjQyNzA5fQ.MBW87hsKsTJ48sLISUVWJJBChGaXHh4d4W-WAC-xLhA").subscribe((data) => (this.userBooks = data));
    console.log(this.userBooks)
  }

  logUser() {
    console.log(this.user);
  }
  updateBookStatus(bookId: string, newStatus: string) {
    const formData = new FormData();
    formData.append('status', newStatus);

    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGY0ZTk0OTExYTg4YmEyY2MwNDU5MSIsImlhdCI6MTcwOTE1NjMwOSwiZXhwIjoxNzA5MjQyNzA5fQ.MBW87hsKsTJ48sLISUVWJJBChGaXHh4d4W-WAC-xLhA'    
    console.log(formData)
    console.log(newStatus)
    this.userService.updateUserBookStatus(bookId, formData, token).subscribe((res:any)=>console.log(res))
  }
}

