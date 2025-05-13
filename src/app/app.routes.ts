import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { UploadresumeComponent } from './uploadresume/uploadresume.component';
import { ParsedresumeComponent } from './parsedresume/parsedresume.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { ForgotpassComponent } from './Auth/forgotpass/forgotpass.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadresumeComponent },
  { path: 'parsed', component: ParsedresumeComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgot-password', component: ForgotpassComponent },
  { path: '**', redirectTo: '' },
{
  path: 'features',
  loadComponent: () => import('./features/features.component').then(m => m.FeaturesComponent)
}

];
