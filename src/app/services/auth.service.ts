import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../interfaces/auth/login-request.payload';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginResponse } from '../interfaces/auth/login-response.payload';
import { GetUserAuthenticated } from '../interfaces/user/get-user-authenticated';
import { UpdateAcountPayload } from '../interfaces/user/form-update-acount-payload';
import { GetUser } from '../interfaces/user/get-user.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

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
    return of(true);
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

  updateAcount(acountPayload: UpdateAcountPayload) {
    return this.httpClient.put<GetUser>(
      `${base_url}user/update-acount`,
      acountPayload
    );
  }

  checkUserIsAdmin() {
    return this.httpClient.get<GetUserAuthenticated>(base_url + 'auth/me').pipe(
      map((data: any) => {
        if (data != null && data.roles.includes('ADMIN')) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
