import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../interfaces/ui/menu.interface';
import { User } from '../models/user.model';

import * as userAuthSelector from '../state/auth/auth.selectors';
@Injectable({
  providedIn: 'root',
})
export class SidebarService implements OnInit {
  public menu: MenuItem[];
  public user: User;

  constructor(
    private authStore: Store<{ auth: any }>,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {}

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
        {
          title: this.translate.instant('MENU.DASHBOARD'),
          icon: 'home',
          path: '../pages/dashboard',
        },
        {
          title: this.translate.instant('MENU.CHARTS'),
          icon: 'analytics',
          path: '../pages/charts',
        },
      ];

      if (this.user.roles.includes('ADMIN')) {
        this.menu.push({
          title: this.translate.instant('MENU.USERS'),
          icon: 'people',
          path: '../pages/users',
        });
      }
    }
  }
}
