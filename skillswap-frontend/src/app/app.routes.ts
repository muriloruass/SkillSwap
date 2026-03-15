import { Routes } from '@angular/router';
import { JobSearchComponent } from './modules/jobs/job-search/job-search';
import { JobDetailsComponent } from './modules/jobs/job-details/job-details';

// Auth
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// Home
import { Home } from './platform/home/home';

// Users
import { MyProfile } from './users/my-profile/my-profile';
import { PublicProfile } from './users/public-profile/public-profile';

// Jobs
import { CreateJob } from './jobs/create-job/create-job';
import { MyJobs } from './jobs/my-jobs/my-jobs';

// The valid Job Details and Job Search components from the user's branch
// (Imports already at top of file)

// Guard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // User's Job Search as home page
  { path: '', component: JobSearchComponent },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'me', component: MyProfile, canActivate: [authGuard] },
  { path: 'users/:username', component: PublicProfile },

  { path: 'jobs/create', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: MyJobs, canActivate: [authGuard] },
  
  // Real authentication for user's job details
  { path: 'jobs/:id', component: JobDetailsComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
