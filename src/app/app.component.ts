import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fromRoot } from './reducers/indexAuth';
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
    authStore.dispatch(fromRoot.apiGetUserAuth());
    authStore.select(fromRoot.getUserState).subscribe((res) => {});
  }

  ngOnInit() {
    console.log('aca');

    this.getHeroes();
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
