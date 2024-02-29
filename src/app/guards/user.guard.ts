import { TokenService } from './../services/token/token.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService);
  return true;
};
