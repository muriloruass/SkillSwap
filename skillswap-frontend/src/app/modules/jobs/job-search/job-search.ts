import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

import { JobService } from '../../../core/services/job.service';
import { Job, JobSearchRequest } from '../../../models/job.model';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css']
})
export class JobSearchComponent implements OnInit {
  searchForm!: FormGroup;
  jobs: Job[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      category: [''],
      min_budget: [null],
      status: ['open']
    });

    // opcional: já carregar jobs abertos ao abrir a página
    this.onSearch();
  }

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.jobs = [];

    const filters: JobSearchRequest = this.searchForm.value;

    this.jobService.searchJobs(filters).subscribe({
      next: (foundJobs: Job[]) => {
        this.jobs = foundJobs;
        this.isLoading = false;

        if (this.jobs.length === 0) {
          this.errorMessage = 'Sorry, no jobs found matching those filters!';
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.error ||
          err?.error?.message ||
          `Error fetching jobs (Status: ${err?.status ?? 'unknown'}).`;
      }
    });
  }
}