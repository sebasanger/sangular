import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';
import { UpdateAcountPayload } from 'src/app/interfaces/user/form-update-acount-payload';
import { User } from 'src/app/models/user.model';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { UserService } from 'src/app/services/user.service';
import { EmailValidPayload } from '../../interfaces/user/EmailValidPayload';
import * as authActions from '../../state/auth/auth.actions';
@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.scss'],
})
export class UpdateAcountComponent implements OnInit {
  public user: User;
  public updateAcountForm: any;
  private userId: number;
  public avatar: string;
  constructor(
    private fb: FormBuilder,
    private reqValidators: ReqValidatorsService,
    public dialog: MatDialog,
    private authStore: Store<{ auth: any }>
  ) {}
  ngOnInit(): void {
    this.loadForm();

    this.authStore.select('auth').subscribe((data: any) => {
      if (data.user != null) {
        this.user = data.user;

        this.loadUser();
      }
    });
  }

  loadForm() {
    this.updateAcountForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.email, Validators.required],
          asyncValidators: [this.checkEmailIsTaked()],
          updateOn: 'blur',
        },
      ],
    });
  }

  loadUser() {
    this.userId = this.user.id;
    this.avatar = this.user.avatar;
    this.updateAcountForm.controls['email'].setValue(this.user.email);
  }

  checkEmailIsTaked(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const emailValidPayload: EmailValidPayload = {
        id: this.user.id,
        email: control.value,
      };

      return this.reqValidators.emailIsValid(emailValidPayload).pipe(
        map((res) => {
          return res ? { emailTaked: true } : null;
        })
      );
    };
  }

  onSubmit() {
    if (this.updateAcountForm.invalid) {
      return;
    } else {
      const updateAcountPayload: UpdateAcountPayload = {
        email: this.updateAcountForm.controls['email'].value,
        id: this.user.id,
      };

      this.authStore.dispatch(
        authActions.updateAcount({
          updateAcountPayload: updateAcountPayload,
        })
      );
    }
  }

  openDialog() {
    this.dialog.open(UploadImageComponent, {
      data: {
        type: 'user',
        id: this.user.id,
        image: this.user.avatar,
      },
    });
  }
}
