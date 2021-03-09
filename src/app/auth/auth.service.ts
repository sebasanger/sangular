import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { LoginResponse } from './login/login-response.payload';
import { LoginRequestPayload } from './login/login-request.payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { GetUserAuthenticated } from '../interfaces/get-user-authenticated';

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
    const data: any = this.decodeDataFromJwtOnStorage;
    return data != null ? data.fullname : '';
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getRoles() {
    const data: any = this.decodeDataFromJwtOnStorage;
    return data != null ? data.roles : '';
  }
  getAvatar() {
    const data: any = this.decodeDataFromJwtOnStorage;
    return data != null ? data.avatar : '';
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
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
        tap((data) => {
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
        map((data) => {
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
    localStorage.setItem('email', data.email);
    localStorage.setItem('expiresAt', data.expiresAt.toString());

    this.loggedIn.emit(true);
    this.fullName.emit(tokenDecoded.fullName);
    this.fullName.emit(data.email);
  }

  removeDataFromStorage() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
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
    return this.httpClient.get<GetUserAuthenticated>(base_url + 'auth/me');
  }

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() fullName: EventEmitter<string> = new EventEmitter();
}
