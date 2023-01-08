import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth-c/auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ForgetComponent} from "./forget/forget.component";
import {UserGuard} from "../shared/Guards/user.guard";

const routes: Routes = [
  {
    path: '', component: AuthComponent, children:[
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forget', component: ForgetComponent},
    ]
  },
  {path:'profile',canActivate:[UserGuard],component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
