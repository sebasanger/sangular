import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(usuario: User, remember: boolean = false) {
    if (remember == true) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, usuario).pipe(
      tap((res: any) => {
        this.saveStorage(res.token, res.menu, res.usuario);
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
}
