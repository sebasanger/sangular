import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;
  ngOnInit(): void {
    this.store.select('auth').subscribe((data: any) => {
      this.isAuthenticated = data.isAuthenticated;
    });
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ auth: any }>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
    }
    return true;
  }
}
