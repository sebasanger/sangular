import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GetUsers } from '../interfaces/get-users';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(filter: string) {
    return this.http.get<GetUsers>(`${base_url}user?filter=${filter}`);
  }
}
