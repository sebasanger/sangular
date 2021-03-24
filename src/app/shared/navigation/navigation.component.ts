import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';

import * as userAuthSelector from '../../selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menuItems: any[];
  public user: User;
  private suscription: Subscription;
  avatar: string;

  user$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private authStore: Store<{ auth: any }>
  ) {}
  ngOnInit(): void {
    this.suscription = this.authStore
      .select(userAuthSelector.getUserState)
      .subscribe((res) => {
        this.user = res;
      });
    this.menuItems = this.sidebarService.menu;
  }

  logout() {
    this.authService.logout();
    this.suscription.unsubscribe();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
