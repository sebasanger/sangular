import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetRequestPayload } from './forget-request.payload';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetRequestPayload: ForgetRequestPayload;
  constructor(
    private fb: FormBuilder,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router
  ) {
    this.forgetRequestPayload = {
      email: '',
    };
  }

  forgetForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.forgetRequestPayload.email = this.forgetForm.get('email')?.value;

    this.forgetPasswordService.sendEmail(this.forgetRequestPayload).subscribe(
      (res) => {
        Swal.fire('Email sended', 'check your email', 'success');
        this.router.navigateByUrl('auth/login');
      },
      (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
}
