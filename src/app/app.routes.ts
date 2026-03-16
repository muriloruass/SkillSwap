import { Routes } from '@angular/router';

// Auth
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// Home
import { Home } from './platform/home/home';

// Users
import { MyProfile } from './users/my-profile/my-profile';
import { PublicProfile } from './users/public-profile/public-profile';

// Jobs - Importando da pasta CORRETA (sem "modules")
import { CreateJob } from './jobs/create-job/create-job';
import { MyJobs } from './jobs/my-jobs/my-jobs';
import { JobDetails } from './jobs/job-details/job-details';

// Guard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Home
  { path: '', component: Home },

  // Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Users
  { path: 'me', component: MyProfile, canActivate: [authGuard] },
  { path: 'users/:username', component: PublicProfile },

  // Jobs - Todas as rotas de jobs
  { path: 'jobs/create', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: MyJobs, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetails, canActivate: [authGuard] },

  // Fallback
  { path: '**', redirectTo: '' }
];