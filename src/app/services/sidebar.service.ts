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
    });
  }

  chargeMenu() {
    this.menu = [
      { title: 'Dashboard', icon: 'home', path: '../pages/dashboard' },
    ];

    if (this.authService.role.includes('ADMIN')) {
      this.menu.push({
        title: 'Users',
        icon: 'people',
        path: '../pages/users',
      });
    }
  }
}
