import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { map, tap } from 'rxjs/operators';
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
    return localStorage.getItem('fullName');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getRoles() {
    return localStorage.getItem('roles');
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

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((data) => {
          this.setDataOnStorage(data);
        })
      );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(base_url + 'auth/login', loginRequestPayload)
      .pipe(
        map((data) => {
          this.setDataOnStorage(data);
          return true;
        })
      );
  }

  setDataOnStorage(data: LoginResponse) {
    this.removeDataFromStorage();
    const tokenDecoded: any = jwt_decode(data.authenticationToken);
    localStorage.setItem('authenticationToken', data.authenticationToken);
    localStorage.setItem('email', data.email);
    localStorage.setItem('fullName', tokenDecoded.fullname);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('expiresAt', data.expiresAt.toString());
    localStorage.setItem('roles', tokenDecoded.roles);

    this.loggedIn.emit(true);
    this.fullName.emit(tokenDecoded.fullName);
    this.fullName.emit(data.email);
  }

  removeDataFromStorage() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('email');
    localStorage.removeItem('fullName');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('roles');
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
