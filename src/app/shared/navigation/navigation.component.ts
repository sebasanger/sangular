import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';

import * as userAuthSelector from '../../state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { apiUserAuthLogout } from 'src/app/state/auth/auth.actions';
import { getMenuItems } from '../../state/menu/menu.selectors';
import { loadMenu } from 'src/app/state/menu/menu.actions';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menuItems: any[];
  public user: User;
  public avatar: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authStore: Store<{ auth: any }>,
    private menuStore: Store<{ menu: any }>
  ) {}
  ngOnInit(): void {
    this.menuStore.dispatch(loadMenu());
    this.authStore.select(userAuthSelector.getUserAuth).subscribe((res) => {
      this.user = res;
    });
    this.menuStore.select(getMenuItems).subscribe((res) => {
      this.menuItems = res;
    });
  }

  logout() {
    this.authStore.dispatch(apiUserAuthLogout());
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
