import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fromRoot } from './reducers/indexAuth';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sangular';

  constructor(authStore: Store<{ auth: any }>) {
    authStore.dispatch(fromRoot.apiGetUserAuth());
    authStore.select(fromRoot.getUserState).subscribe((res) => {
      console.log(res);
    });
  }
}
