import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequestPayload } from '../interfaces/login-request.payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GetUserAuthenticated } from '../interfaces/get-user-authenticated';
import { LoginResponse } from '../interfaces/login-response.payload';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { RefreshTokenPayload } from '../interfaces/refresh-token.payload';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;
  private userSuscription: Subscription = new Subscription();
  constructor(
    private authStore: Store<{ auth: any }>,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.authStore.select('auth').subscribe((data: any) => {
      if (data.user != null) {
        this.userSuscription = this.user = data.user;
      } else {
        this.user = null;
        this.userSuscription.unsubscribe();
      }
    });
  }

  getUser() {
    return { ...this.user };
  }

  getJwtToken(): string {
    return localStorage.getItem('authenticationToken');
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(base_url + 'auth/login', loginRequestPayload)
      .pipe(
        map((data: any) => {
          this.setUserDataOnStorageAndRemoveOld(data);
          return data;
        })
      );
  }

  setUserDataOnStorageAndRemoveOld(data: LoginResponse) {
    this.removeDataFromStorage();
    localStorage.setItem('authenticationToken', data.authenticationToken);
    localStorage.setItem('expiresAt', data.expiresAt.toString());
  }

  removeDataFromStorage() {
    localStorage.removeItem('authenticationToken');
    localStorage.removeItem('expiresAt');
  }

  logout() {
    this.router.navigateByUrl('auth/login');
    this.removeDataFromStorage();
  }

  getAuthenticatedUser() {
    return this.httpClient.get<User>(base_url + 'auth/me');
  }

  checkUserAuthenticated() {
    return this.httpClient.get<GetUserAuthenticated>(base_url + 'auth/me').pipe(
      map((data: any) => {
        if (data != null) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
