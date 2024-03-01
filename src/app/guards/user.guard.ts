import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.tokenService.authToken$.subscribe((token) => {
      if (!token) {
        return true;
      }
      this.userService.getUser(token).subscribe((user) => {
        if (user) {
          return false;
        } else {
          return true;
        }
      });
      return true;
    });
  }
}
