import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from './forgotpass/forgotpass.component';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'login', component: LoginComponent },
    {path:'forgotpass',component:ForgotPasswordComponent}
];
