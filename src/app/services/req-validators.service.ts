import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailValidPayload } from '../interfaces/user/EmailValidPayload';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ReqValidatorsService {
  constructor(private http: HttpClient) {}

  emailIsValid(emailValid: EmailValidPayload) {
    return this.http.post(base_url + 'user/checkEmailIsValid', emailValid);
  }
}
