import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { TokenService } from '../../services/token/token.service';

export const userGuard: CanActivateFn = (route, state) => {
  let user!:User;
  const userService = inject(UserService);
  const tokenService = inject(TokenService);
  userService.getUser(tokenService.getToken()).subscribe(data=>user= data);

  return user?.confirmed||false;
};
