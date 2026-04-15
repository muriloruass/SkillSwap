import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobsService, Job, Proposal } from '../../../core/services/job.service';
import { ProposalService } from '../../../core/services/proposal';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './job-details.html',
  styleUrls: ['./job-details.css']
})
export class JobDetails implements OnInit {
  private jobsService = inject(JobsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  job: Job | null = null;
  proposals: Proposal[] = [];
  loading = true;
  errorMessage = '';
  isOwner = false;

  private proposalService = inject(ProposalService);
  proposalPrice: number | null = null;
  proposalCoverLetter: string = '';
  submittingProposal = false;
  proposalSuccess = false;

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJob(jobId);
    }
  }

  loadJob(jobId: string) {
    this.jobsService.getJobById(jobId).subscribe({
      next: (job: any) => {
        this.job = job;
        this.checkIfOwner();
        this.loadProposals(jobId);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Failed to load job';
        this.loading = false;
      }
    });
  }

  loadProposals(jobId: string) {
    this.jobsService.getJobProposals(jobId).subscribe({
      next: (proposals: any) => {
        this.proposals = proposals;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  checkIfOwner() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const ownerId = this.job?.owner?.id || this.job?.owner?._id;
    this.isOwner = ownerId === user?.id;
  }

  acceptProposal(proposalId: string) {
    this.jobsService.acceptProposal(proposalId).subscribe({
      next: () => {
        this.router.navigate(['/jobs/my-postings']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Failed to accept proposal';
      }
    });
  }

  completeJob() {
    if (this.job) {
      const jobId = this.job.id || this.job.job_id;
      
      if (!jobId) {
        this.errorMessage = 'Job ID not found';
        return;
      }
      
      this.jobsService.completeJob(jobId).subscribe({
        next: () => {
          this.router.navigate(['/jobs/my-postings']);
        },
        error: (err: any) => {
          this.errorMessage = err.error?.error || 'Failed to complete job';
        }
      });
    }
  }

  submitProposal() {
    if (!this.job || !this.proposalPrice || !this.proposalCoverLetter) return;
    
    this.submittingProposal = true;
    this.errorMessage = '';
    
    const jobId = this.job.id || this.job.job_id;
    if (!jobId) return;
    
    this.proposalService.createProposal(jobId, {
      price: this.proposalPrice,
      cover_letter: this.proposalCoverLetter
    }).subscribe({
      next: () => {
        this.submittingProposal = false;
        this.proposalSuccess = true;
        this.proposalPrice = null;
        this.proposalCoverLetter = '';
        this.loadProposals(jobId);
      },
      error: (err: any) => {
        this.submittingProposal = false;
        this.errorMessage = err.error?.error || 'Failed to submit proposal';
      }
    });
  }
}