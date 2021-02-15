import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

  public hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const user = new User(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    );

    this._userService.login(user, true).subscribe(
      (res: any) => {
        Swal.fire('Bienvenido', res.usuario.nombre, 'success');
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
}
