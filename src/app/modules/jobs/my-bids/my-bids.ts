import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProposalService } from '../../../core/services/proposal';
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

  constructor(private proposalService: ProposalService) {}

  ngOnInit() {
    this.loadMyBids();
  }

  loadMyBids() {
    this.isLoading = true;
    
    this.proposalService.getMyBids().subscribe({
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
    if (confirm('Are you sure you want to cancel this proposal?')) {
      this.proposalService.deleteProposal(bidId).subscribe({
        next: () => {
          this.bids = this.bids.filter(b => b.id !== bidId);
        },
        error: (err: any) => {
          console.error('Error canceling bid:', err);
          alert('Failed to cancel proposal. Please try again.');
        }
      });
    }
  }
}