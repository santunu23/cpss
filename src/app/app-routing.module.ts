import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsermanagerComponent} from './usermanager/usermanager.component';
import {LogoutComponent} from './logout/logout.component';
import {UpdateusermanagerComponent} from './updateusermanager/updateusermanager.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent},
  {path:'dashboard',component: DashboardComponent},
  {path:'usermanager',component: UsermanagerComponent},
  {path:'updateusermanager',component:UpdateusermanagerComponent},
  {path:'logout',component:LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
