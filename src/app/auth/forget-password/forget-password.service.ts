import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForgetRequestPayload } from './forget-request.payload';

const base_url = environment.base_url;
const client_url = environment.client_url;
@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  constructor(private http: HttpClient) {}

  sendEmail(forgetRequestPayload: ForgetRequestPayload) {
    forgetRequestPayload.urlRedirect = client_url + 'auth/reset-password';
    return this.http.post<null>(
      base_url + 'reset-password',
      forgetRequestPayload
    );
  }
}
