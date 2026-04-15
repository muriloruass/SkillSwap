import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';

export interface Job {
  job_id?: string;
  id?: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed';
  owner: any;
  freelancer?: any;
  created_at: string;
  proposals_count?: number;
}

export interface Proposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  freelancer?: any;
  price: number;
  cover_letter: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private http = inject(HttpClient);
  private apiUrl = API_BASE_URL;

  createJob(jobData: Partial<Job>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs`, jobData);
  }

  getMyJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/my-postings`);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  getJobProposals(jobId: string): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.apiUrl}/jobs/${jobId}/proposals`);
  }

  acceptProposal(proposalId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/proposals/${proposalId}/accept`, {});
  }

  completeJob(jobId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/jobs/${jobId}/complete`, {});
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}`);
  }
}
