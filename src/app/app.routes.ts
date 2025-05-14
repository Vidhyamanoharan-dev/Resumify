import { Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { ForgotPasswordComponent } from './forgotpass/forgotpass.component';

import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent },
    {path: 'login', component: LoginComponent },
    {path:'forgotpass',component:ForgotPasswordComponent}
];
