import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import * as userApiActions from '../../../state/user/user.api.actions';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public user: User;
  private userId: number;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  constructor(
    private route: ActivatedRoute,
    private userStore: Store<{ user: any }>,
    private router: Router
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

  loadUser() {
    this.userStore.select('user').subscribe((res) => {
      const selectedUser = res.selectedUser;

      if (selectedUser != null) {
        this.user = selectedUser;
        console.log(this.user);
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.userStore.dispatch(userApiActions.deletUser({ id }));
        setTimeout(() => {
          this.router.navigateByUrl('pages/users');
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the user is safe', 'error');
      }
    });
  }

  editUser(userid: number) {
    this.router.navigateByUrl('pages/users/update/' + userid);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
