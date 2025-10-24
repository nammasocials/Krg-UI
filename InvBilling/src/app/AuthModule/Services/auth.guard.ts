import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';


export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuth => {
      if (isAuth) {
        return true;
      }
      else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
