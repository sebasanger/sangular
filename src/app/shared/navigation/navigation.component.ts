import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menuItems: any[];
  isLoggedIn: boolean;
  public user: User;
  private suscription: Subscription;
  avatar: string;

  user$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private store: Store<{ auth: any }>
  ) {}
  ngOnInit(): void {
    this.suscription = this.store.select('auth').subscribe((data: any) => {
      this.user = data;
    });
    this.menuItems = this.sidebarService.menu;
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
