import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from './forgotpass/forgotpass.component';
import { LoadingComponent } from './loading/loading.component'

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'forgotpass',component:ForgotPasswordComponent},
  {path:'loading',component:LoadingComponent}
];
