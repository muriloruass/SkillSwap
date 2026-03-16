<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 🔴 CORRIGIDO: paths relativos
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message';
import { JobsService } from '../../core/services/job.service';
import { Job } from '../../models/job.model';  // JobSearchRequest talvez não exista

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './job-search.html',
  styleUrls: ['./job-search.css']
})
export class JobSearchComponent implements OnInit {
  searchForm!: FormGroup;
  allJobs: Job[] = [];
  jobs: Job[] = [];
  
  isLoading: boolean = false;
  errorMessage: string | null = null;
  searchTerm: string = '';
  
  constructor(
    private fb: FormBuilder,
    private jobsService: JobsService  // 🔴 CORRIGIDO: JobsService (com S)
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      category: [''],
      min_budget: [null],
      status: ['open']
    });
    
    this.loadAllJobs();
  }

  loadAllJobs() {
    this.isLoading = true;
    // 🔴 USANDO método que existe
    this.jobsService.getMyJobs().subscribe({
      next: (jobs: Job[]) => {
        this.allJobs = jobs;
        this.jobs = jobs;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao carregar jobs';
        console.error(err);
      }
    });
  }

  onSearch() {
    this.isLoading = true;
    const term = this.searchForm.get('searchTerm')?.value?.toLowerCase() || '';
    
    // 🔴 FILTRO LOCAL
    this.jobs = this.allJobs.filter(job => 
      job.title?.toLowerCase().includes(term) ||
      job.description?.toLowerCase().includes(term)
    );
    
    this.isLoading = false;
    if (this.jobs.length === 0) {
      this.errorMessage = 'Nenhum job encontrado';
    }
  }
}
=======
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
>>>>>>> f7f35650c8c1d3a5088bcab0a5d486d1887bb854
