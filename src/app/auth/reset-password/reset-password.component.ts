import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = this.fb.group({
    password: [null, [Validators.required]],
    repeatPassword: [null, Validators.required],
  });

  public hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let token = params['tokenuid'];
      console.log(token);
    });
  }

  onSubmit() {
    if (
      this.resetPasswordForm.controls['repeatPassword'].value !=
      this.resetPasswordForm.controls['password'].value
    ) {
      alert('Error');
    } else {
      alert('Thanks!');
    }
  }
}
