import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalService } from '../../../core/services/proposal';
import { Proposal } from '../../../models/proposal.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-my-bids',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './my-bids.html',
  styleUrl: './my-bids.css',
})
export class MyBidsComponent implements OnInit {
  bids: Proposal[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  
  private proposalService = inject(ProposalService);

  ngOnInit(): void {
    this.loadMyBids();
  }

  loadMyBids(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.proposalService.getMyBids().subscribe({
      next: (bids) => {
        this.bids = bids;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load your proposals. Please try again.';
        this.isLoading = false;
      }
    });
  }

  cancelBid(id: number): void {
    if (!confirm('Are you sure you want to cancel this proposal?')) {
      return;
    }

    this.proposalService.deleteProposal(id).subscribe({
      next: () => {
        this.loadMyBids(); // Refresh the list
      },
      error: (err) => {
        alert('Could not cancel the proposal.');
      }
    });
  }
}
