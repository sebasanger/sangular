import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public menuItems: any[];
  isLoggedIn: boolean;
  email: string | null;
  fullName: string | null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private _sidebarService: SidebarService
  ) {
    this.menuItems = _sidebarService.menu;
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.email.subscribe((data: string) => (this.email = data));
    this.isLoggedIn = this.authService.isLoggedIn();
    this.email = this.authService.getEmail();
    this.fullName = this.authService.getFullName();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
