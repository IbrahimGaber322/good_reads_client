import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user!: User;
  token: string | null =null;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tokenService.authToken$.subscribe((token) => {
  
      this.token = token;
      this.userService.getUser(token).subscribe((user) => {
        this.user = user;
      });
      this.userService.updateUsers();
    });
  }

  logout() {
    this.tokenService.clearToken();
    location.reload();
  }
}
