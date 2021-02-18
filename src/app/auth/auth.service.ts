import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { LoginResponse } from './login/login-response.payload';
import { LoginRequestPayload } from './login/login-request.payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  getEmail() {
    return localStorage.getItem('email');
  }
  getFullName() {
    return localStorage.getItem('fullName');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  get role(): 'ADMIN' | 'USER' | 'ADMIN, USER' {
    const tokenDecoded: any = jwt_decode(this.getJwtToken()!);
    return tokenDecoded.roles;
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  getJwtToken(): string | null {
    return localStorage.getItem('authenticationToken');
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
          const tokenDecoded: any = jwt_decode(data.authenticationToken);
          localStorage.setItem('authenticationToken', data.authenticationToken);
          localStorage.setItem('email', data.email);
          localStorage.setItem('fullName', tokenDecoded.fullname);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('expiresAt', data.expiresAt.toString());

          this.loggedIn.emit(true);
          this.fullName.emit(tokenDecoded.fullName);
          this.fullName.emit(data.email);

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

  logout() {
    this.httpClient
      .post(base_url + 'auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('email');
    localStorage.removeItem('fullName');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    this.router.navigateByUrl('auth/login');
  }

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() fullName: EventEmitter<string> = new EventEmitter();
  @Output() email: EventEmitter<string> = new EventEmitter();
}
