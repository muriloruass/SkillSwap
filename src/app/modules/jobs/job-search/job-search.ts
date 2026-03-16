import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

import { JobsService } from '../../../core/services/job.service';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css']
})
export class JobSearchComponent implements OnInit {
  searchForm!: FormGroup;
  jobs: any[] = [];
  
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: [''],
      min_budget: [null],
      status: ['open']
    });
  }

  onSearch() {
    this.isLoading = true;
    this.errorMessage = null;

    const filters = this.searchForm.value;

    this.jobsService.searchJobs(filters).subscribe({
      next: (foundJobs: any) => {
        this.jobs = foundJobs;
        this.isLoading = false;
        
        if (this.jobs.length === 0) {
          this.errorMessage = "Sorry, no jobs found matching those filters!";
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = `Error fetching jobs (Status: ${err.status}): ${err.message || 'Check your connection'}`;
      }
    });
  }
}