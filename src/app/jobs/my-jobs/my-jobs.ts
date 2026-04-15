import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobsService, Job } from '../jobs.service';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-jobs.html',
  styleUrls: ['./my-jobs.css'],
})
export class MyJobs implements OnInit {
  private jobsService = inject(JobsService);

  jobs: Job[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobsService.getMyJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to load jobs';
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in_progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  deleteJob(jobId: string | undefined) {
    if (!jobId) {
      return;
    }

    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      this.jobsService.deleteJob(jobId).subscribe({
        next: () => {
          this.jobs = this.jobs.filter((j) => (j.id || j.job_id) !== jobId);
        },
        error: (err) => {
          console.error('Error deleting job:', err);
          alert('Failed to delete job. Please try again.');
        },
      });
    }
  }
}
