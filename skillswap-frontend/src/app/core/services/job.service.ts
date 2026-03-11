import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job, JobSearchRequest } from '../../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  searchJobs(filters: JobSearchRequest) {
    return this.http.post<Job[]>(`${this.apiUrl}/jobs/search`, filters);
  }

  createJob(data: {
    title: string;
    description: string;
    budget: number;
    category: string;
  }) {
    return this.http.post(`${this.apiUrl}/jobs`, data);
  }

  getMyJobs() {
    return this.http.get(`${this.apiUrl}/jobs/my-postings`);
  }

  getJobById(id: string) {
    return this.http.get(`${this.apiUrl}/jobs/${id}`);
  }

  getProposals(jobId: string) {
    return this.http.get(`${this.apiUrl}/jobs/${jobId}/proposals`);
  }

  acceptProposal(proposalId: string) {
    return this.http.patch(`${this.apiUrl}/proposals/${proposalId}/accept`, {});
  }

  completeJob(jobId: string) {
    return this.http.patch(`${this.apiUrl}/jobs/${jobId}/complete`, {});
  }
}