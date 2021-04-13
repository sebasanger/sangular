import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResetPasswordService } from './reset-password.service';
import { ResetRequestPayload } from './reset-request.payload';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetRequestPayload: ResetRequestPayload;
  resetPasswordForm = this.fb.group({
    password: [null, [Validators.required]],
    repeatPassword: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService
  ) {
    this.resetRequestPayload = {
      password: '',
      password2: '',
      token: '',
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let tokenuid = params['tokenuid'];
      this.resetRequestPayload.token = tokenuid;
      if (!tokenuid) {
        Swal.fire('Token not valid', 'Follow the link on your email', 'error');
        this.router.navigateByUrl('auth/login');
      }
    });
  }

  onSubmit() {
    if (
      this.resetPasswordForm.controls['repeatPassword'].value !=
      this.resetPasswordForm.controls['password'].value
    ) {
      Swal.fire('Error', 'Password not missmatch', 'error');
    } else {
      this.resetRequestPayload.password = this.resetPasswordForm.controls[
        'password'
      ].value;
      this.resetRequestPayload.password2 = this.resetPasswordForm.controls[
        'repeatPassword'
      ].value;

      this.resetPasswordService
        .resetPassword(this.resetRequestPayload)
        .subscribe(
          (res) => {
            this.router.navigateByUrl('auth/login');
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}
