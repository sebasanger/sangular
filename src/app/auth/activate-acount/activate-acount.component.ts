import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivateAcountService } from './activate-acount.service';
import { ValidateAcountPayload } from './validate-acount-request.payload';

@Component({
  selector: 'app-activate-acount',
  templateUrl: './activate-acount.component.html',
  styleUrls: ['./activate-acount.component.scss'],
})
export class ActivateAcountComponent implements OnInit {
  activateAcountForm = this.fb.group({
    password: [null, [Validators.required]],
    repeatPassword: [null, Validators.required],
  });

  validateAcountPayload: ValidateAcountPayload;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private activateAcountService: ActivateAcountService
  ) {
    this.validateAcountPayload = {
      password: '',
      password2: '',
      token: '',
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let tokenuid = params['tokenuid'];
      this.validateAcountPayload.token = tokenuid;
      if (!tokenuid) {
        Swal.fire('Token not valid', 'Follow the link on your email', 'error');
        this.router.navigateByUrl('auth/login');
      }
    });
  }
  onSubmit() {
    if (
      this.activateAcountForm.controls['repeatPassword'].value !=
      this.activateAcountForm.controls['password'].value
    ) {
      Swal.fire('Error', 'Password not missmatch', 'error');
    } else {
      this.validateAcountPayload.password = this.activateAcountForm.controls[
        'password'
      ].value;
      this.validateAcountPayload.password2 = this.activateAcountForm.controls[
        'repeatPassword'
      ].value;

      this.activateAcountService
        .activateAcount(this.validateAcountPayload)
        .subscribe(
          (res) => {
            Swal.fire('Acount validated', 'Go to login page', 'success');
            this.router.navigateByUrl('auth/login');
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
    }
  }
}
