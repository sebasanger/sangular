import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { LoginResponse } from '../auth/login/login-response.payload';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('authenticationToken');

    let request = req;

    if (token) {
      request = this.addToken(req, token);
    }

    return this.handleRequest(request, next);
  }

  handleRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.refreshTokenInterceptor(req, next);
        } else if (err.status === 403) {
          Swal.fire(
            'Forebidden',
            'You do not have a role to access the resource',
            'error'
          );
        }
        return throwError(err);
      })
    );
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken),
    });
  }

  refreshTokenInterceptor(req: HttpRequest<any>, next: HttpHandler) {
    const refreshToken: string = localStorage.getItem('refreshToken');
    const email: string = localStorage.getItem('email');
    this.authService.refreshToken(refreshToken, email).subscribe(
      (refreshTokenResponse: LoginResponse) => {
        console.log(refreshTokenResponse);

        console.log('Token refrescado');
        this.handleRequest(req, next);
      },
      (err) => {
        console.log('Token de refresco invalido');
        this.authService.logout();
      }
    );
  }
}
