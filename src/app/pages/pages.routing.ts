import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from '../guards/admin.guard';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { CreateUpdateUserComponent } from './users/create-update-user/create-update-user.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';
import { ChartsComponent } from './charts/charts.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Pages' },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { subtitle: 'Dashboard' },
      },
      {
        path: 'charts',
        component: ChartsComponent,
        data: { subtitle: 'Charts' },
      },
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            component: ViewUsersComponent,
            pathMatch: 'full',
          },
          {
            path: 'create',
            component: CreateUpdateUserComponent,
            data: { subtitle: 'Add user' },
          },
          {
            path: 'update/:id',
            component: CreateUpdateUserComponent,
            data: { subtitle: 'Update user' },
          },
          {
            path: 'details/:id',
            component: UserDetailsComponent,
            data: { subtitle: 'Details user' },
          },
        ],
      },
      {
        path: 'update-acount',
        component: UpdateAcountComponent,
        data: { subtitle: 'Update acount' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
