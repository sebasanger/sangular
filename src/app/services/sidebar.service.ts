import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../interfaces/ui/menu.interface';
import { User } from '../models/user.model';

import * as userAuthSelector from '../state/auth/auth.selectors';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: MenuItem[];
  public user: User;

  constructor(private authStore: Store<{ auth: any }>) {}

  loadMenu(): Observable<MenuItem[]> {
    this.authStore.select(userAuthSelector.getUserAuth).subscribe((res) => {
      this.user = res;
      this.chargeMenu();
    });

    return of(this.menu);
  }

  chargeMenu() {
    if (this.user != null) {
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
}
