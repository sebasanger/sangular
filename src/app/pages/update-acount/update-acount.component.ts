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
import { UpdateAcountPayload } from 'src/app/interfaces/form-update-acount-payload';
import { User } from 'src/app/models/user.model';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EmailValidPayload } from '../../interfaces/EmailValidPayload';

@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.scss'],
})
export class UpdateAcountComponent {
  public user: User;
  public updateAcountForm: any;
  constructor(
    private fb: FormBuilder,
    private reqValidators: ReqValidatorsService,
    public dialog: MatDialog,
    private userService: UserService,
    private authStore: Store<{ auth: any }>
  ) {
    this.authStore.select('auth').subscribe((data: any) => {
      this.user = data.user;
      this.loadForm();
    });
  }

  loadForm() {
    this.updateAcountForm = this.fb.group({
      email: [
        this.user.email,
        {
          validators: [Validators.email, Validators.required],
          asyncValidators: [this.checkEmailIsTaked()],
          updateOn: 'blur',
        },
      ],
    });
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

      this.userService.updateAcount(updateAcountPayload).subscribe((res) => {
        Swal.fire('Acount updated', 'Great', 'success');
      });
    }
  }

  openDialog() {
    this.dialog.open(UploadImageComponent, {
      data: {
        type: 'user',
        id: this.user.id,
        image: this.user.img,
      },
    });
  }
}
