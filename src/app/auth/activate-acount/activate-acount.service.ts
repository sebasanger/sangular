import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ValidateAcountPayload } from './validate-acount-request.payload';
const baseUrl = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ActivateAcountService {
  constructor(private http: HttpClient, private router: Router) {}
  activateAcount(validateAcountPayload: ValidateAcountPayload) {
    return this.http.put<boolean>(
      baseUrl + 'auth/validate-acount',
      validateAcountPayload
    );
  }
}
