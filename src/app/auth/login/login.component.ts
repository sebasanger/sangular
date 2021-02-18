import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
  });

  loginRequestPayload: LoginRequestPayload;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginRequestPayload.email = this.loginForm.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;

    this._authService.login(this.loginRequestPayload).subscribe(
      (res: any) => {
        Swal.fire('Welcome', 'You logged in', 'success');
        this.router.navigateByUrl('/pages/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.mensaje, 'error');
        throwError(err);
      }
    );
  }
}
