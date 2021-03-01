import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ActivateAcountComponent } from './activate-acount/activate-acount.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [],
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'activate-acount', component: ActivateAcountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
