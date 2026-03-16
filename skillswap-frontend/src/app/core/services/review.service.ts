import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';
  private http = inject(HttpClient);

  /**
   * Submits a review/rating for a completed job.
   * Communicates with the API: POST /reviews
   * NOTE: The AuthInterceptor automatically adds the Bearer JWT token.
   */
  submitReview(jobId: number, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, {
      job_id: jobId,
      rating,
      comment,
    });
  }
}
