import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { BrowseResumeComponent } from './browseresume/browseresume.component';
import { ParsedresumeComponent } from './parsedresume/parsedresume.component';
import { ForgotpassComponent } from './Auth/forgotpass/forgotpass.component';
import { SelectedFilesComponent } from './selectedfiles/selectedfiles.component';
import { ResumeEnhancingComponent } from './resume-enhancing/resume-enhancing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: BrowseResumeComponent},
  { path: 'selectedfiles', component: SelectedFilesComponent },
  { path: 'enhance', component: ResumeEnhancingComponent },
  { path: 'parsedresumes', component: ParsedresumeComponent },
  { path: 'forgot-password', component: ForgotpassComponent },
  { path: '**', redirectTo: '' },
];
