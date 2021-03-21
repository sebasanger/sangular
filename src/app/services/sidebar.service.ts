import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuInterface } from '../interfaces/menu.interface';
import { AuthService } from './auth.service';
import * as userAuthSelector from '../selectors/auth.selectors';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: MenuInterface[] = [];
  public user: User;

  constructor(private authStore: Store<{ auth: any }>) {
    this.authStore.select('auth').subscribe((res) => {
      this.user = res.user;
      this.chargeMenu();
    });
  }

  chargeMenu() {
    this.menu = [
      { title: 'Dashboard', icon: 'home', path: '../pages/dashboard' },
      { title: 'Charts', icon: 'analytics', path: '../pages/charts' },
    ];

    if (this.user.roles.includes('ADMIN')) {
      this.menu.push({
        title: 'Users',
        icon: 'people',
        path: '../pages/users',
      });
    }
  }
}
