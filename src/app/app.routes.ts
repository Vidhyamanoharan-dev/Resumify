import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ParsedresumeComponent } from './parsedresume/parsedresume.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { AboutComponent } from './home/about/about.component';
import { ForgotpassComponent } from './Auth/forgotpass/forgotpass.component';
import { UploadResumeComponent } from './uploadresume/uploadresume.component';

export const routes: Routes = [
   { path: '', component: UploadResumeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadResumeComponent },
  { path: 'parsed', component: ParsedresumeComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgot-password', component: ForgotpassComponent },


    // Move this BEFORE '**'
  {
    path: 'features',
    loadComponent: () => import('./home/features/features.component').then(m => m.FeaturesComponent)
  },

  // Keep this at the end
  { path: '**', redirectTo: '' }

];
