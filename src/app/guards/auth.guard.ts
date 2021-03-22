import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { getIsUserAuthenticated } from '../selectors/auth.selectors';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getAuthenticatedUser().pipe(
      tap((res) => {
        if (res) {
          console.log('User is authenticated');
        } else {
          this.router.navigateByUrl('auth/login');
        }
      })
    );
  }
}
