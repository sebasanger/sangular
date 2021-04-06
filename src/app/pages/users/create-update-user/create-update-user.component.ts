import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailValidPayload } from 'src/app/interfaces/user/EmailValidPayload';
import { UserCreateUpdatePayload } from 'src/app/interfaces/user/form-user.payload';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { UserService } from 'src/app/services/user.service';
import { getUserById } from 'src/app/state/user/user.api.actions';
import Swal from 'sweetalert2';

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
    private reqValidators: ReqValidatorsService,
    private userStore: Store<{ user: any }>
  ) {}

  userForm = this.fb.group({
    fullName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      null,
      {
        validators: [Validators.email, Validators.required],
        asyncValidators: [this.checkEmailIsTaked()],
        updateOn: 'blur',
      },
    ],
    roles: [null, Validators.required],
  });

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

  checkEmailIsTaked(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.emailValidPayload.id = this.userId | 0;
      this.emailValidPayload.email = control.value;
      return this.reqValidators.emailIsValid(this.emailValidPayload).pipe(
        map((res) => {
          return res ? { emailTaked: true } : null;
        })
      );
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.userId > 0) {
        this.userStore.dispatch(getUserById({ id: this.userId }));
      }
    });
    this.loadUser();
  }

  loadUser() {
    this.userStore.select('user').subscribe((res) => {
      console.log(res.entities);

      if (res != null) {
        this.userRequestPayload.id = res.id;
        this.userForm.controls['fullName'].setValue(res.fullName);
        this.userForm.controls['email'].setValue(res.email);
        this.userForm.controls['roles'].setValue(res.roles);
      }
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
