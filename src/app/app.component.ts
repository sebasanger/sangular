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
    private authStore: Store<{ auth: any }>,
    private userStore: Store<{ user: any }>,
    private ruserService: RuserService
  ) {
    this.heroes$ = ruserService.entities$;
    this.loading$ = ruserService.loading$;
    authStore.dispatch(authRoot.apiGetUserAuth());
  }

  ngOnInit() {
    //this.getUsers();
  }

  add(user: User) {
    this.ruserService.add(user);
  }

  delete(user: User) {
    this.ruserService.delete(user.id);
  }

  getUsers() {
    this.ruserService.getAll();
  }

  update(user: User) {
    this.ruserService.update(user);
  }
}
