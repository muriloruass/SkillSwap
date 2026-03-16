import { Routes } from '@angular/router';

// Auth
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// Home
import { Home } from './platform/home/home';

// Users
import { MyProfile } from './users/my-profile/my-profile';
import { PublicProfile } from './users/public-profile/public-profile';

// Jobs - SEUS
import { CreateJob } from './jobs/create-job/create-job';
import { MyJobs } from './jobs/my-jobs/my-jobs';

// Jobs - DO AMIGO (modules) - CORRIGIDO
import { JobDetailsComponent } from './modules/jobs/job-details/job-details';
import { JobSearchComponent } from './modules/jobs/job-search/job-search';

// Guard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'me', component: MyProfile, canActivate: [authGuard] },
  { path: 'users/:username', component: PublicProfile },
  { path: 'jobs/create', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: MyJobs, canActivate: [authGuard] },
  { path: 'jobs/search', component: JobSearchComponent, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];