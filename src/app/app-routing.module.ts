import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { Nopage404Component } from './shared/nopage404/nopage404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages',
    pathMatch: 'full',
    data: { title: 'myTitle' },
  },
  { path: '**', component: Nopage404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
