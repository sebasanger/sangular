import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EmailValidPayload } from './EmailValidPayload';
import { UpdateAcountPayload } from './form-update-acount-payload';

@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.scss'],
})
export class UpdateAcountComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private reqValidators: ReqValidatorsService
  ) {}
  private updateAcountPayload: UpdateAcountPayload = {
    id: 0,
    email: '',
  };
  private userId: number;
  emailValidPayload: EmailValidPayload = { id: 0, email: '' };

  updateAcountForm = this.fb.group(
    {
      email: [null, [Validators.required, Validators.email]],
    },
    {
      validators: this.emailValid('email'),
    }
  );

  emailValid(formEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.get(formEmail);

      if (emailControl.value != null) {
        this.emailValidPayload.email = emailControl.value;
        this.emailValidPayload.id = this.userId;
        this.reqValidators
          .emailIsValid(this.emailValidPayload)
          .subscribe((res) => {
            if (res) {
              emailControl.setErrors({ emailTaked: true });
            } else {
              emailControl.setErrors(null);
            }
          });
      }
    };
  }

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe((res) => {
      const { id, email } = res;
      this.userId = id;
      this.updateAcountPayload.id = id;
      this.updateAcountForm.controls.email.setValue(email);
    });
  }

  onSubmit() {
    if (this.updateAcountForm.invalid) {
      return;
    } else {
      this.updateAcountPayload.email = this.updateAcountForm.controls[
        'email'
      ].value;
    }
    this.userService.updateAcount(this.updateAcountPayload).subscribe((res) => {
      Swal.fire('Acount updated', 'Great', 'success');
    });
  }
}
