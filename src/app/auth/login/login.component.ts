import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequestPayload } from '../../interfaces/auth/login-request.payload';
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

  changerRememberStatus() {
    this.remember = !this.remember;
  }
  constructor(
    private fb: FormBuilder,
    private authStore: Store<{ auth: any }>
  ) {
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
    const loginRequestPayload: LoginRequestPayload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authStore.dispatch(authRoot.login({ payload: loginRequestPayload }));
  }
}
