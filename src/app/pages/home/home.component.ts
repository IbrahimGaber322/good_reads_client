import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: User | null = null;
  token: string|null = null;
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.tokenService.authToken$.subscribe(token=> this.token=token);
      this.userService.getUser(this.token).subscribe((data) => {this.user = data; });
    }
  }
  logUser() {
    console.log(this.user);
  }
}
