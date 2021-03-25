import { Component } from '@angular/core';
import { authRoot } from './state/auth/indexAuth';
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
    private ruserService: RuserService
  ) {
    this.heroes$ = ruserService.entities$;
    this.loading$ = ruserService.loading$;
    authStore.dispatch(authRoot.apiGetUserAuth());
  }

  ngOnInit() {
    this.getHeroes();
    // const updateUser = new User(
    //   'segasaga@gmail.com',
    //   'sebastian gabriel sangermano',
    //   ['USER', 'ADMIN'],
    //   10,
    //   'miImagejeje'
    // );
    // this.update(updateUser);
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
