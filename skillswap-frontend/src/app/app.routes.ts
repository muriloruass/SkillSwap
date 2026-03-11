import { Routes } from '@angular/router';

import { JobSearchComponent } from './modules/jobs/job-search/job-search';

// Auth
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';

// Home
import { Home } from './modules/home/home';

// Profile
import { ProfileMe } from './modules/profile/profile-me/profile-me';
import { PublicProfile } from './modules/profile/public-profile/public-profile';

// Jobs (client)
import { JobCreate } from './modules/jobs/job-create/job-create';
import { JobList } from './modules/jobs/job-list/job-list';
import { JobDetail } from './modules/jobs/job-detail/job-detail';

// Guard
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  // HOME
  { path: '', component: Home },

  // AUTH
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // JOB SEARCH (membro 2)
  { path: 'jobs/search', component: JobSearchComponent },

  // PROFILE
  { path: 'me', component: ProfileMe, canActivate: [authGuard] },
  { path: 'users/:username', component: PublicProfile },

  // JOBS (client side)
  { path: 'jobs/create', component: JobCreate, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: JobList, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetail, canActivate: [authGuard] },

  // fallback
  { path: '**', redirectTo: '' }
];