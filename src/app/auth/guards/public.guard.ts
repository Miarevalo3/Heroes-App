import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';


export const canActivateLoginGuard: CanActivateFn = (
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
) => {
console.log('CanActivate');
console.log({ route, state });

return checkAuthStatus();
};

export const canMatchLoginGuard: CanMatchFn = (
route: Route,
segments: UrlSegment[]
) => {
console.log('CanMatch');
console.log({ route, segments });

return checkAuthStatus();
};

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/']);
      }
    }),
    map( isAutenticated => !isAutenticated),
  );
};
