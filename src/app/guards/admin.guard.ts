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
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private authStore: Store<{ auth: any }>
  ) {
    this.authStore.select('auth').subscribe((data: any) => {
      this.user = data.user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.user.roles.includes('ADMIN')) {
      console.log('User is admin');
      return true;
    } else {
      this.router.navigateByUrl('/pages');
      Swal.fire('Forbidden', 'You dont have permision to enter here', 'error');
    }
    return true;
  }
}
