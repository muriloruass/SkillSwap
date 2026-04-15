import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './platform/home/home';
import { MyProfile } from './users/my-profile/my-profile';
import { PublicProfile } from './users/public-profile/public-profile';
import { CreateJob } from './jobs/create-job/create-job';
import { MyJobs } from './jobs/my-jobs/my-jobs';
import { JobDetails } from './modules/jobs/job-details/job-details';
import { JobSearchComponent } from './modules/jobs/job-search/job-search';
import { MyBidsComponent } from './modules/jobs/my-bids/my-bids';
import { LeaveReviewComponent } from './modules/jobs/leave-review/leave-review';
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
  { path: 'jobs/my-bids', component: MyBidsComponent, canActivate: [authGuard] },
  { path: 'jobs/:id/review', component: LeaveReviewComponent, canActivate: [authGuard] },
  { path: 'jobs/:id', component: JobDetails, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
