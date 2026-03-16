import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.css']
})
export class CreateJob {
  private jobsService = inject(JobsService);
  private router = inject(Router);

  jobData = {
    title: '',
    description: '',
    budget: undefined,  
    category: ''
  };

  categories = ['Development', 'Design', 'Writing', 'Marketing', 'Other'];
  loading = false;
  errorMessage = '';

  onSubmit() {
    if (!this.jobData.title || !this.jobData.description || !this.jobData.budget || !this.jobData.category) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.jobsService.createJob(this.jobData).subscribe({
      next: (response) => {
        console.log('Resposta da API:', response);
        
        // A API retorna { job_id: '...', message: '...' }
        const jobId = response?.job_id;
        
        if (jobId) {
          this.router.navigate(['/jobs', jobId]);
        } else {
          this.errorMessage = 'Job created but no ID returned';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Erro:', error);
        this.errorMessage = error.error?.error || 'Failed to create job';
        this.loading = false;
      }
    });
  }
}