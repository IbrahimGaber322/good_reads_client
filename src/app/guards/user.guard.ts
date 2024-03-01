import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/user/user.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.tokenService.authToken$.pipe(
      switchMap((token) => {
        if (!token) {
          return of(true);
        } else {
          return this.userService.getUser(token).pipe(
            map((user) => {
              if (user) {
                this.router.navigate(['/']);
                return false;
              } else {
                return true;
              }
            }),
            catchError(() => {
              return of(true); // handle error, for example, if user is not found
            })
          );
        }
      }),
      catchError(() => {
        return of(true); // handle error, for example, if token is not available
      })
    );
  }
}
