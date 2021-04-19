import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import * as userAuthSelector from '../../state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { apiUserAuthLogout } from 'src/app/state/auth/auth.actions';
import { getMenuItems } from '../../state/menu/menu.selectors';
import { loadMenu, setPageTitle } from 'src/app/state/menu/menu.actions';
import { Title } from '@angular/platform-browser';
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
    private menuStore: Store<{ menu: any }>,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    this.authStore.select('auth').subscribe((data: any) => {
      if (data.user != null) {
        this.user = data.user;
        this.avatar = this.user.avatar;
      }
    });
    this.menuStore.dispatch(loadMenu());
    this.authStore.select(userAuthSelector.getUserAuth).subscribe((res) => {
      this.user = res;
    });
    this.menuStore.select(getMenuItems).subscribe((res) => {
      this.menuItems = res;
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle + ' | ' + 'Sangular');
    this.menuStore.dispatch(setPageTitle({ title: newTitle }));
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
