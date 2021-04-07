import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { getUserAuth } from '../state/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.checkUserIsAdmin().pipe(
      tap((res) => {
        if (res) {
          console.log('User is ADMIN');
        } else {
          Swal.fire(
            'Forebidden',
            'you dont have permision to access this resource',
            'error'
          );
        }
      })
    );
  }
}
