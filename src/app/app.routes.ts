import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { AboutComponent } from './home/about/about.component';
import { BrowseResumeComponent } from './uploadresume/uploadresume.component';
import { SelectedFilesComponent } from './selectedfiles/selectedfiles.component';
import { HomeComponent } from './home/home.component';
import { ForgotpassComponent } from './Auth/forgotpass/forgotpass.component';
import { ParsedresumeComponent } from './parsed-resumes/parsed-resumes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
 { path: 'browse', component: BrowseResumeComponent },
  { path: 'selectedfiles', component: SelectedFilesComponent },
    { path: 'parsedresumes', component: ParsedresumeComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'about', component: AboutComponent },
  { path: 'forgotpass', component: ForgotpassComponent },

  {
    path: 'features',
    loadComponent: () =>
      import('./home/features/features.component').then(m => m.FeaturesComponent),
  },

  // Keep this at the end
  { path: '**', redirectTo: '' }

]

