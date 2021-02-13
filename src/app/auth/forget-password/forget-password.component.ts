import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  ngOnInit(): void {}

  onSubmit() {
    alert('Thanks!');
  }
}
