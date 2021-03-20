import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.getAuthenticatedUser().subscribe((res) => {
      res;
    });
  }
  title = 'sangular';
}
