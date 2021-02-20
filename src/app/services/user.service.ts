import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { catchError, map, tap } from 'rxjs/operators';
import { GetUsers } from '../interfaces/get-users';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any[]>(base_url + 'user?filter=c');
  }
}
