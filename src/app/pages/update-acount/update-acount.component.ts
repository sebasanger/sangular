import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
    private reqValidators: ReqValidatorsService,
    public dialog: MatDialog,
    private fileUploadService: FileUploadService
  ) {}
  private updateAcountPayload: UpdateAcountPayload = {
    id: 0,
    email: '',
  };
  private userId: number;
  public avatar: string;
  emailValidPayload: EmailValidPayload = { id: 0, email: '' };

  updateAcountForm = this.fb.group({
    email: [
      null,
      {
        validators: [Validators.email, Validators.required],
        asyncValidators: [this.checkEmailIsTaked()],
        updateOn: 'blur',
      },
    ],
  });

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

  ngOnInit(): void {}

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

  openDialog() {
    this.dialog.open(UploadImageComponent, {
      data: {
        type: 'user',
        id: this.userId,
        image: this.avatar,
      },
    });
  }
}
