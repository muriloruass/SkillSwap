import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobsService } from '../../../core/services/job.service';
import { ProposalService } from '../../../core/services/proposal';
import { Job } from '../../../models/job.model';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './job-details.html',
  styleUrls: ['./job-details.css']
})
export class JobDetailsComponent implements OnInit {
  job: any = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  proposalForm: FormGroup;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService,
    private proposalService: ProposalService,
    private fb: FormBuilder
  ) {
    this.proposalForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(1)]],
      cover_letter: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJobDetails(jobId);
    } else {
      this.isLoading = false;
      this.errorMessage = "Invalid Job ID provided in the URL.";
    }
  }

  loadJobDetails(id: string): void {
    this.jobsService.getJobById(id).subscribe({
      next: (jobData: any) => {
        this.job = jobData;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = `Could not load job details. (Status: ${err.status})`;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/jobs/search']);
  }

  submitProposal(): void {
    if (this.proposalForm.invalid || !this.job) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    
    const newProposalData = {
      price: this.proposalForm.get('price')?.value,
      cover_letter: this.proposalForm.get('cover_letter')?.value
    };

    this.proposalService.createProposal(this.job.id.toString(), newProposalData).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.proposalForm.reset();
        console.log('Proposal created successfully:', response);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        if (err.status === 409) {
          this.errorMessage = "You have already submitted a proposal for this job.";
        } else {
          this.errorMessage = err.error?.error || 'Failed to submit proposal. Please try again.';
        }
      }
    });
  }
}