import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobsService } from '../../../core/services/job.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-my-bids',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './my-bids.html',
  styleUrls: ['./my-bids.css']
})
export class MyBidsComponent implements OnInit {
  bids: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private jobsService: JobsService) {}

  ngOnInit() {
    this.loadMyBids();
  }

  loadMyBids() {
    this.isLoading = true;
    
    this.jobsService.getJobProposals('my').subscribe({
      next: (data: any) => {
        this.bids = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading bids:', err);
        this.errorMessage = err.error?.error || 'Error loading proposals';
        this.isLoading = false;
      }
    });
  }

  cancelBid(bidId: number) {
    console.log('Cancel bid:', bidId);
  }
}