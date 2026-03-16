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