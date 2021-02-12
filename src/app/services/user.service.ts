import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UserService {}
