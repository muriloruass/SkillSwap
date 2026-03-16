import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

import { JobService } from '../../../core/services/job.service';
import { Job, JobSearchRequest } from '../../../models/job.model';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css']
})
export class JobSearchComponent implements OnInit {
  searchForm!: FormGroup;
  jobs: Job[] = []; // Where we store the fetched jobs
  
  isLoading: boolean = false;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private jobService: JobService
  ) {}

  ngOnInit() {
    // Initialize form with default empty/open filters
    this.searchForm = this.fb.group({
      category: [''],       // Empty category 
      min_budget: [null],   // No min budget limit
      status: ['open']      // Default 'open' jobs
    });
  }

  // Action triggered when clicking the Search Button
  onSearch() {
    this.isLoading = true;
    this.errorMessage = null;

    // Retrieve form filters values
    const filters: JobSearchRequest = this.searchForm.value;

    // Ask JobService to fetch data from API
    this.jobService.searchJobs(filters).subscribe({
      next: (foundJobs) => {
        this.jobs = foundJobs;
        this.isLoading = false;
        
        if (this.jobs.length === 0) {
           this.errorMessage = "Sorry, no jobs found matching those filters!";
        }
      },
      error: (err) => {
        // If API goes down or connection fails
        this.isLoading = false;
        this.errorMessage = `Error fetching jobs (Status: ${err.status}): ${err.message || 'Check your connection'}`;
      }
    });
  }
}

