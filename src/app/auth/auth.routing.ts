import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

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
        canActivate: [AuthGuard, AdminGuard],
      },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
