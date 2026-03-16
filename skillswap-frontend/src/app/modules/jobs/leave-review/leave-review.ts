import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-leave-review',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './leave-review.html',
  styleUrl: './leave-review.css',
})
export class LeaveReviewComponent implements OnInit {
  jobId!: number;
  selectedRating: number = 0;
  comment: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isSuccess: boolean = false;

  stars = [1, 2, 3, 4, 5];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reviewService = inject(ReviewService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.jobId = id ? Number(id) : 0;
  }

  selectRating(star: number): void {
    this.selectedRating = star;
  }

  submitReview(): void {
    if (this.selectedRating === 0) {
      this.errorMessage = 'Please select a star rating before submitting.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.reviewService.submitReview(this.jobId, this.selectedRating, this.comment).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/proposals/my-bids']);
        }, 2500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Failed to submit your review. Please try again.';
      },
    });
  }
}
