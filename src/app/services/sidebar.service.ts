import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [];

  constructor(private router: Router) {
    this.chargeMenu();
  }

  chargeMenu() {
    this.menu = [
      { title: 'Dashboard', icon: 'home', path: 'dashboard' },
      { title: 'Dashboard', icon: 'home', path: 'asd' },
      { title: 'Dashboard', icon: 'home', path: 'sdasdqads' },
    ];
  }
}
