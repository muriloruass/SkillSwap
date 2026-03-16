import { Routes } from '@angular/router';
import { JobSearchComponent } from './modules/jobs/job-search/job-search';
import { JobDetailsComponent } from './modules/jobs/job-details/job-details';
import { MyBidsComponent } from './modules/jobs/my-bids/my-bids';
import { LeaveReviewComponent } from './modules/jobs/leave-review/leave-review';

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

<<<<<<< HEAD
=======
// The valid Job Details and Job Search components from the user's branch
// (Imports already at top of file)

>>>>>>> f7f35650c8c1d3a5088bcab0a5d486d1887bb854
// Guard
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
<<<<<<< HEAD
  // Home
  { path: '', component: Home },
=======
  // User's Job Search as home page
  { path: '', component: JobSearchComponent },
>>>>>>> f7f35650c8c1d3a5088bcab0a5d486d1887bb854

  // Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Users
  { path: 'me', component: MyProfile, canActivate: [authGuard] },
  { path: 'users/:username', component: PublicProfile },

  // Jobs - Todas as rotas de jobs
  { path: 'jobs/create', component: CreateJob, canActivate: [authGuard] },
  { path: 'jobs/my-postings', component: MyJobs, canActivate: [authGuard] },
  
  // Leave Review — must be declared BEFORE jobs/:id to avoid route conflict
  { path: 'jobs/:id/review', component: LeaveReviewComponent, canActivate: [authGuard] },

  // Real authentication for user's job details
  { path: 'jobs/:id', component: JobDetailsComponent, canActivate: [authGuard] },
  
  // Proposals
  { path: 'proposals/my-bids', component: MyBidsComponent, canActivate: [authGuard] },

  // Fallback
  { path: '**', redirectTo: '' }
];
