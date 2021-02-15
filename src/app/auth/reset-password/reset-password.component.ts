import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

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
