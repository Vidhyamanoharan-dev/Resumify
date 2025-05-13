import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from './forgotpass/forgotpass.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'forgotpass',component:ForgotPasswordComponent}
];
