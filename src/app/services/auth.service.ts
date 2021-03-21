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

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    private storeAuth: Store<{ auth: any }>,
    private httpClient: HttpClient,
    private router: Router
  ) {}
  userStore$: Observable<any> = new Observable();

  ngOnInit(): void {
    this.userStore$ = this.storeAuth.select('auth');
    this.getAuthenticatedUser().subscribe((res) => {
      console.log(res);
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

  get decodeDataFromJwtOnStorage(): string | null {
    const token: string = this.getJwtToken();

    try {
      return jwt_decode(token);
    } catch (error) {
      this.refreshToken().subscribe();
    }
    return null;
  }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    email: this.getEmail(),
  };

  refreshToken() {
    console.log('Token refreshed');

    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((data: any) => {
          this.storeAuth.dispatch(SET_USER({ user: new User(data.user) }));
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
          this.storeAuth.dispatch(SET_USER({ user: new User(data.user) }));
          this.setUserDataOnStorageAndRemoveOld(data);
          return true;
        })
      );
  }

  setUserDataOnStorageAndRemoveOld(data: LoginResponse) {
    this.removeDataFromStorage();
    const tokenDecoded: any = jwt_decode(data.authenticationToken);
    localStorage.setItem('authenticationToken', data.authenticationToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('expiresAt', data.expiresAt.toString());
  }

  removeDataFromStorage() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
  }

  logout() {
    this.httpClient
      .post(base_url + 'auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        }
      );
    this.removeDataFromStorage();
    this.router.navigateByUrl('auth/login');
  }

  getAuthenticatedUser() {
    return this.httpClient.get<GetUserAuthenticated>(base_url + 'auth/me').pipe(
      map((data: any) => {
        this.storeAuth.dispatch(SET_USER({ user: new User(data) }));
        if (data != null) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
