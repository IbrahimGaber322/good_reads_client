import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { UserService } from '../services/user/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let token: string | null = null;
  inject(TokenService).authToken$.subscribe((t) => (token = t));
  const user = inject(UserService).getUser(token).subscribe();
  if (user) {
    return true;
  } else {
    return false;
  }
};
