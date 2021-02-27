import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UpdateAcountPayload } from './form-update-acount-payload';

@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.scss'],
})
export class UpdateAcountComponent implements OnInit {
  private updateAcountPayload: UpdateAcountPayload = {
    id: 0,
    email: '',
  };

  updateAcountForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe((res) => {
      const { id, email } = res;
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
