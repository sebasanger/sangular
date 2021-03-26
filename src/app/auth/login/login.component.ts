import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequestPayload } from '../../interfaces/login-request.payload';
import { Store } from '@ngrx/store';
import { authRoot } from '../../state/auth/indexAuth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public remember: boolean = false;
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
    private authStore: Store<{ auth: any }>
  ) {
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
    this.remember = localStorage.getItem('remember') != null;
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
    this.authStore.dispatch(
      authRoot.login({ payload: this.loginRequestPayload })
    );
  }
}
