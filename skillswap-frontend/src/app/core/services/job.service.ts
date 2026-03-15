import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job, JobSearchRequest } from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // The URL provided by Professor
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  // 🔥 MOCK DE AUTENTICAÇÃO (SOMENTE PARA TESTES - APAGAR DEPOIS QUE A LUCIANA FIZER O LOGIN) 🔥
  // O backend da faculdade exige que a gente mande um Crachá "Bearer JWT" para abrir a vaga:
  private fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNjlhOWZlNWE1N2ZiYjJiMzNkMDc0ZDllIiwicm9sZSI6ImZyZWVsYW5jZXIiLCJleHAiOjE3NzMzNTgzOTZ9.fakeSignature';

  // The Angular "injects" the HttpClient here (the messenger that goes to the internet)
  constructor(private http: HttpClient) { }

  /**
   * Helper que anexa a nossa MasterKey às requisições Http.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.fakeToken}`
    });
  }

  /**
   * Communicates with the API: POST /jobs/search
   * Receives the filters (search) and returns a List of Jobs (Job[])
   */
  searchJobs(filters: JobSearchRequest): Observable<Job[]> {
    return this.http.post<Job[]>(`${this.apiUrl}/jobs/search`, filters, { headers: this.getHeaders() });
  }

  /**
   * Communicates with the API: GET /jobs/<id>
   * Fetches the complete details for a single specific Job
   */
  getJobById(id: string): Observable<Job> {
    // 🚀 TEMPORARY FIX: Bypass the 401 error by fetching from the search endpoint instead
    if (this.fakeToken.endsWith('.fakeSignature')) {
      return this.searchJobs({}).pipe(
        map((jobs: Job[]) => {
          const job = jobs.find((j: Job) => String(j.id) === String(id));
          if (!job) {
            throw new Error('Job not found');
          }
          return job;
        })
      );
    }
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`, { headers: this.getHeaders() });
  }
}
