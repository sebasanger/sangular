import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EmailValidPayload } from 'src/app/interfaces/user/EmailValidPayload';
import { UserCreateUpdatePayload } from 'src/app/interfaces/user/form-user.payload';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { environment } from 'src/environments/environment';
import * as userApiActions from '../../../state/user/user.api.actions';

const client_url = environment.client_url;
@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss'],
})
export class CreateUpdateUserComponent implements OnInit, OnDestroy {
  private userId: number;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reqValidators: ReqValidatorsService,
    private userStore: Store<{ user: any }>
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      takeUntil(this.ngUnsubscribe);
      if (this.userId > 0) {
        this.userStore.dispatch(
          userApiActions.getUserById({ id: this.userId })
        );
      }
    });
    this.loadUser();
  }

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
        takeUntil(this.ngUnsubscribe),
        map((res) => {
          return res ? { emailTaked: true } : null;
        })
      );
    };
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
      urlRedirect: client_url + 'auth/activate-acount?tokenuid=',
      roles: roles.value,
      id: this.userId,
    };

    if (userRequestPayload.id > 0 || userRequestPayload.id != null) {
      this.userStore.dispatch(
        userApiActions.modifyUser({
          userCreateUpdatePayload: userRequestPayload,
        })
      );
    } else {
      this.userStore.dispatch(
        userApiActions.createUser({
          userCreateUpdatePayload: userRequestPayload,
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
