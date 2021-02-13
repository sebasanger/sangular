import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInterface } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: MenuInterface[] = [];

  constructor(private router: Router) {
    this.chargeMenu();
  }

  chargeMenu() {
    this.menu = [
      { title: 'Dashboard', icon: 'home', path: '../pages/dashboard' },
      { title: 'Login', icon: 'login', path: '../auth/login' },
      {
        title: 'Password forget',
        icon: 'not_listed_location',
        path: '../auth/forget-password',
      },
      {
        title: 'Password reset',
        icon: 'mode_edit',
        path: '../auth/reset-password',
      },
    ];
  }
}
