import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../interfaces/login-request.payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { GetUserAuthenticated } from '../interfaces/get-user-authenticated';
import { LoginResponse } from '../interfaces/login-response.payload';
import { Store } from '@ngrx/store';
import { SET_USER } from '../actions/auth.actions';
import { User } from '../models/user.model';
import { RefreshTokenPayload } from '../interfaces/refresh-token.payload';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  constructor(
    private authStore: Store<{ auth: any }>,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.authStore.select('auth').subscribe((data: any) => {
      this.user = data.user;
    });
  }

  getEmail() {
    return localStorage.getItem('email');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getJwtToken(): string {
    return localStorage.getItem('authenticationToken');
  }

  refreshToken() {
    const refreshTokenPayload: RefreshTokenPayload = {
      email: this.getEmail(),
      refreshToken: this.getRefreshToken(),
    };
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/auth/refresh/token',
        refreshTokenPayload
      )
      .pipe(
        tap((data: any) => {
          this.authStore.dispatch(SET_USER({ user: new User(data.user) }));
          this.setUserDataOnStorageAndRemoveOld(data);
        }),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(base_url + 'auth/login', loginRequestPayload)
      .pipe(
        map((data: any) => {
          this.authStore.dispatch(SET_USER({ user: new User(data.user) }));
          this.setUserDataOnStorageAndRemoveOld(data);
          return true;
        })
      );
  }

  setUserDataOnStorageAndRemoveOld(data: LoginResponse) {
    this.removeDataFromStorage();
    localStorage.setItem('authenticationToken', data.authenticationToken);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('expiresAt', data.expiresAt.toString());
  }

  removeDataFromStorage() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.removeItem('expiresAt');
  }

  logout() {
    this.router.navigateByUrl('auth/login');
    this.removeDataFromStorage();
  }

  getAuthenticatedUser() {
    return this.httpClient.get<GetUserAuthenticated>(base_url + 'auth/me').pipe(
      map((data: any) => {
        this.authStore.dispatch(SET_USER({ user: new User(data) }));
        if (data != null) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
