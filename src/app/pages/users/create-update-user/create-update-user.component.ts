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
import { createUser, getUserById } from 'src/app/state/user/user.api.actions';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const client_url = environment.client_url;
@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
})
export class CreateUpdateUserComponent implements OnInit {
  private userId: number;
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

  public pageTitle: string;

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
      const selectedUser = res.selectedUser;

      if (selectedUser != null) {
        this.userId = selectedUser.id;
        this.userForm.controls['fullName'].setValue(selectedUser.fullName);
        this.userForm.controls['email'].setValue(selectedUser.email);
        this.userForm.controls['roles'].setValue(selectedUser.roles);
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    const { fullName, email, roles } = this.userForm.controls;
    const userRequestPayload: UserCreateUpdatePayload = {
      email: email.value,
      fullName: fullName.value,
      urlRedirect: client_url + '/auth/activate-acount?tokenuid=',
      roles: roles.value,
      id: this.userId,
    };

    if (userRequestPayload.id > 0) {
      this.updateUser(userRequestPayload);
    } else {
      this.addNewUser(userRequestPayload);
    }
  }

  addNewUser(userRequestPayload: UserCreateUpdatePayload) {
    this.userStore.dispatch(
      createUser({ userCreateUpdatePayload: userRequestPayload })
    );
  }

  updateUser(userRequestPayload: UserCreateUpdatePayload) {
    this.userService.updateUser(userRequestPayload).subscribe(
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
