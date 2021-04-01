import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UpdateAcountPayload } from '../interfaces/user/form-update-acount-payload';
import { UserCreateUpdatePayload } from '../interfaces/user/form-user.payload';
import { GetPaginatedUsers } from '../interfaces/user/get-paginated-users';
import { GetUser } from '../interfaces/user/get-user.interface';

const base_url = environment.base_url;
const client_url = environment.client_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedUsers>(`${base_url}user/pageable`, {
      params: new HttpParams()
        .set('page', pageIndex.toString())
        .set('filter', filter)
        .set('size', pageSize.toString())
        .set('sort', `${sort},${sortDirection}`),
    });
  }

  getUserById(userId: number) {
    return this.http.get<GetUser>(`${base_url}user/${userId}`);
  }

  createUser(userPayload: UserCreateUpdatePayload) {
    userPayload.urlRedirect = client_url + '/auth/activate-acount?tokenuid=';
    return this.http.post<GetUser>(`${base_url}user`, userPayload);
  }

  updateUser(userPayload: UserCreateUpdatePayload) {
    return this.http.put<GetUser>(`${base_url}user`, userPayload);
  }

  updateAcount(acountPayload: UpdateAcountPayload) {
    return this.http.put<GetUser>(
      `${base_url}user/update-acount`,
      acountPayload
    );
  }
}
