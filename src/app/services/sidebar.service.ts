import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuInterface } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: MenuInterface[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.chargeMenu();
    this.authService.loggedIn.subscribe((res: any) => {
      this.chargeMenu();
      console.log('Cambianding de user');
    });
  }

  chargeMenu() {
    this.menu = [
      { title: 'Dashboard', icon: 'home', path: '../pages/dashboard' },
      { title: 'Login', icon: 'login', path: '../auth/login' },

      {
        title: 'Password reset',
        icon: 'mode_edit',
        path: '../auth/reset-password',
      },
    ];

    if (this.authService.role.includes('ADMIN')) {
      this.menu.push(
        {
          title: 'Password forget',
          icon: 'not_listed_location',
          path: '../auth/forget-password',
        },
        {
          title: 'Password forget',
          icon: 'not_listed_location',
          path: '../auth/forget-password',
        }
      );
    }
  }
}
