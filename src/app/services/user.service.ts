import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public user: User = new User('');

  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.user.id || '';
  }
  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {
    return this.user.role;
  }

  get headerToken() {
    return { headers: { 'Bearer: ': this.token } };
  }

  login(user: User, remember: boolean = false) {
    if (remember == true) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}auth/login`, user).pipe(
      tap((res: any) => {
        this.saveStorage(res.token, res.menu, res.user);
      })
    );
  }

  saveStorage(token: string, menu: any, usuario?: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
    if (usuario) {
      localStorage.setItem('user', JSON.stringify(usuario));
    }
  }

  validateToken(): Observable<boolean> {
    return this.http.post(`${base_url}auth/validate-token`, this.token).pipe(
      map((res: any) => {
        const { fullName, email, role, id, img = '' } = res.usuario;
        this.user = new User(email, '', fullName, id, role, img);
        this.saveStorage(res.token, res.menu);
        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(false);
      })
    );
  }
}
