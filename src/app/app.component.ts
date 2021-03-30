import { Component } from '@angular/core';
import { authRoot } from './state/auth/indexAuth';
import { userRoot } from './state/user/indexUser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { RuserService } from './services/ruser.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sangular';
  loading$: Observable<boolean>;
  heroes$: Observable<User[]>;

  constructor(
    authStore: Store<{ auth: any }>,
    userStore: Store<{ user: any }>,
    private ruserService: RuserService
  ) {
    this.heroes$ = ruserService.entities$;
    this.loading$ = ruserService.loading$;
    authStore.dispatch(authRoot.apiGetUserAuth());
    userStore.dispatch(
      userRoot.apiGetUsersPaginated({
        filter: '',
        pageIndex: 1,
        pageSize: 1,
        sort: '',
        sortDirection: 'asc',
      })
    );
  }

  ngOnInit() {
    //this.getHeroes();
  }

  add(user: User) {
    this.ruserService.add(user);
  }

  delete(user: User) {
    this.ruserService.delete(user.id);
  }

  getHeroes() {
    this.ruserService.getAll();
  }

  update(user: User) {
    this.ruserService.update(user);
  }
}
