import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import { AuthGuard } from "./shared/classes/auth.guard";


const routes: Routes = [
    {path: '', component: AuthLayoutComponent, children: [
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'registration', component: RegistrationPageComponent}
    ]},
    {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
