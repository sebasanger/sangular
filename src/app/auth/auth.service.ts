import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { LoginResponse } from './login/login-response.payload';
import { LoginRequestPayload } from './login/login-request.payload';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  getEmail() {
    return localStorage.retrieve('email');
  }
  getRefreshToken() {
    return localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken() {
    return localStorage.retrieve('authenticationToken');
  }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    email: this.getEmail(),
  };

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(base_url + 'auth/login', loginRequestPayload)
      .pipe(
        map((data) => {
          localStorage.store('authenticationToken', data.authenticationToken);
          localStorage.store('email', data.email);
          localStorage.store('refreshToken', data.refreshToken);
          localStorage.store('expiresAt', data.expiresAt);

          this.loggedIn.emit(true);
          this.email.emit(data.email);
          return true;
        })
      );
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        base_url + '/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          localStorage.removeItem('authenticationToken');
          localStorage.removeItem('expiresAt');
          localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() email: EventEmitter<string> = new EventEmitter();
}
