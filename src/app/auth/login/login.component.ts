import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { LoginRequestPayload } from '../../interfaces/login-request.payload';
import { Subscription, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public remember: boolean = false;
  public loading: boolean = false;
  private suscription: Subscription;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('remember'),
      [Validators.required, Validators.email],
    ],
    password: [null, Validators.required],
  });

  loginRequestPayload: LoginRequestPayload;

  changerRememberStatus() {
    this.remember = !this.remember;
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private store: Store<{ ui: boolean }>
  ) {
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
    this.remember = localStorage.getItem('remember') != null;
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  ngOnInit(): void {
    this.suscription = this.store.select('ui').subscribe((ui: any) => {
      this.loading = ui.isLoading;
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.remember) {
      localStorage.setItem('remember', this.loginForm.get('email')?.value);
    } else {
      localStorage.removeItem('remember');
    }
    this.loginRequestPayload.email = this.loginForm.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    this.loginRequestPayload.remember = this.loginForm.get('remember')?.value;

    this._authService.login(this.loginRequestPayload).subscribe(
      (res: any) => {
        Swal.fire('Welcome', 'You are logged in', 'success');
        this.router.navigateByUrl('/pages/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
        throwError(err);
      }
    );
  }
}
