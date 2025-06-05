import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ForgotpassComponent } from './Auth/forgotpass/forgotpass.component';
import { SelectedFilesComponent } from './selectedfiles/selectedfiles.component';
import { ResumeEnhancingComponent } from './resume-enhancing/resume-enhancing.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'upload',
    loadComponent: () => import('./browseresume/browseresume.component').then(m => m.BrowseResumeComponent),
    canActivate: [AuthGuard]
  },
  { path: 'enhance', component: ResumeEnhancingComponent },
  {
    path: 'parsedresumes',
    loadComponent: () => import('./parsedresume/parsedresume.component').then(m => m.ParsedresumeComponent),
    canActivate: [AuthGuard]
  },
  { path: 'selectedfiles', component: SelectedFilesComponent },
  { path: 'forgot-password', component: ForgotpassComponent },
  { path: 'loading', loadComponent: () => import('./loading/loading.component').then(m => m.LoadingComponent) },
  { path: 'animload', loadComponent: () => import('./animload/animload.component').then(m => m.AnimLoadingComponent) },
  { path: 'help',
    loadComponent: () =>
      import('./footer-pages/help/help.component').then(m => m.HelpComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./footer-pages/contactus/contactus.component').then(m => m.ContactusComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./footer-pages/privacypolicy/privacypolicy.component').then(m => m.PrivacypolicyComponent)
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./footer-pages/termsofservice/termsofservice.component').then(m => m.TermsofserviceComponent)
  },
  {
    path: 'gdpr-ccpa',
    loadComponent: () =>
      import('./footer-pages/gdrp-ccpa/gdrp-ccpa.component').then(m => m.GDRPCCPAComponent)
  },
  { path: '**', redirectTo: '' }
];
