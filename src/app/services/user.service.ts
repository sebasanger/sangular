import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GetPaginatedUsers } from '../interfaces/get-paginated-users';
const base_url = environment.base_url;
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
    return this.http.get<GetPaginatedUsers>(`${base_url}user`, {
      params: new HttpParams()
        .set('page', pageIndex.toString())
        .set('filter', filter)
        .set('size', pageSize.toString())
        .set('sort', `${sort},${sortDirection}`),
    });
  }
}
