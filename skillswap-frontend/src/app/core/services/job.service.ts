import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobSearchRequest } from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // The URL provided by Professor
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  // The Angular "injects" the HttpClient here (the messenger that goes to the internet)
  constructor(private http: HttpClient) { }

  /**
   * Communicates with the API: POST /jobs/search
   * Receives the filters (search) and returns a List of Jobs (Job[])
   */
  searchJobs(filters: JobSearchRequest): Observable<Job[]> {
    return this.http.post<Job[]>(`${this.apiUrl}/jobs/search`, filters);
  }

  /**
   * Communicates with the API: GET /jobs/<id>
   * Fetches the complete details for a single specific Job
   */
  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }
}
