import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResetRequestPayload } from './reset-request.payload';

const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient, private router: Router) {}

  resetPassword(resetRequestPayload: ResetRequestPayload) {
    return this.http.post<null>(
      baseUrl + 'reset-password/change-password',
      resetRequestPayload
    );
  }
}
