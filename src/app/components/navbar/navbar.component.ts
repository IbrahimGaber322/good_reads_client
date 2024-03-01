import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
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
  user?: User;
  token: string | null = null;
  searchTerm: string = '';
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  handleSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    const currentRoute = this?.router?.url.split('?')[0];

    if (searchTerm.trim() !== '') {
      switch (currentRoute) {
        case '/books':
          this.router.navigate(['/books'], {
            queryParams: { name: searchTerm.trim() },
          });
          break;
        case '/categories':
          this.router.navigate(['/categories'], {
            queryParams: { name: searchTerm.trim() },
          });
          break;
        case '/authors':
          this.router.navigate(['/authors'], {
            queryParams: { firstName: searchTerm.trim() },
          });
          break;
        default:
      }
    }
  }

  logout() {
    this.tokenService.clearToken();
    location.reload();
  }
}
