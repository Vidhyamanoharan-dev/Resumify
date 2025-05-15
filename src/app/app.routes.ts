import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ParsedresumeComponent } from './parsedresume/parsedresume.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { AboutComponent } from './home/about/about.component';
import { BrowseResumeComponent } from './uploadresume/uploadresume.component';
import { SelectedFilesComponent } from './selectedfiles/selectedfiles.component';
import { HomeComponent } from './home/home.component';
import { ResumeEnhancingComponent } from './resume-enhancing/resume-enhancing.component';
import { ForgotPasswordComponent } from './Auth/forgotpass/forgotpass.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 { path: 'browse', component: BrowseResumeComponent },
  { path: 'selectedfiles', component: SelectedFilesComponent },
  { path: 'parsedresumes', component: ParsedresumeComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgotpass', component: ForgotPasswordComponent },


    // Move this BEFORE '**'
  {
    path: 'features',
    loadComponent: () => import('./home/features/features.component').then(m => m.FeaturesComponent)
  },

  // Keep this at the end
  { path: '**', redirectTo: '' }

]