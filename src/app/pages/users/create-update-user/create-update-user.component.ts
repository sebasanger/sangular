import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {
  EmailValidPayload,
  UserCreateUpdatePayload,
} from './form-user.payload';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
})
export class CreateUpdateUserComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private reqValidators: ReqValidatorsService
  ) {}

  userForm = this.fb.group(
    {
      fullName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: [null, [Validators.email, Validators.required]],
      roles: [null, Validators.required],
    },
    {
      validators: this.emailValid('email'),
    }
  );

  roles = [
    { name: 'User', value: 'USER' },
    { name: 'Admin', value: 'ADMIN' },
  ];

  userRequestPayload: UserCreateUpdatePayload = {
    fullName: '',
    email: '',
    roles: [],
    urlRedirect: '',
  };

  public pageTitle: string;
  private userId: number;

  emailValidPayload: EmailValidPayload = { id: 0, email: '' };

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
    this.pageTitle = this.route.snapshot.data['subtitle'];

    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId > 0) {
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(userId: number) {
    this.userService.getUserById(userId).subscribe((res) => {
      const { fullName, email, id, roles } = res;
      this.userRequestPayload.id = id;
      this.userForm.controls['fullName'].setValue(fullName);
      this.userForm.controls['email'].setValue(email);
      this.userForm.controls['roles'].setValue(roles);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const { fullName, email, roles } = this.userForm.controls;

    this.userRequestPayload.fullName = fullName.value;
    this.userRequestPayload.email = email.value;
    this.userRequestPayload.roles = roles.value;

    if (this.userRequestPayload.id > 0) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    this.userService.createUser(this.userRequestPayload).subscribe(
      (res) => {
        Swal.fire(
          'User created',
          'Activate user acount with the email ' + res.email,
          'success'
        );
        this.router.navigateByUrl('/pages/users');
      },
      (err: any) => {
        const validationErrors = err.error.errors;
        if (err.status === 400) {
          Object.keys(validationErrors).forEach((prop) => {
            const formControl = this.userForm.get(prop);
            if (formControl) {
              formControl.setErrors({
                serverError: validationErrors[prop],
              });
            }
          });
        }
      }
    );
  }

  updateUser() {
    this.userService.updateUser(this.userRequestPayload).subscribe(
      (res) => {
        Swal.fire('User updated', 'User updated', 'success');
        this.router.navigateByUrl('/pages/users');
      },
      (err: any) => {
        const validationErrorMessage = err.error.message;

        if (validationErrorMessage != null) {
          Swal.fire('Error', validationErrorMessage, 'error');
        }

        const validationErrors = err.error.errors;
        if (err.status === 400) {
          Object.keys(validationErrors).forEach((prop) => {
            const formControl = this.userForm.get(prop);
            if (formControl) {
              formControl.setErrors({
                serverError: validationErrors[prop],
              });
            }
          });
        }
      }
    );
  }
}
