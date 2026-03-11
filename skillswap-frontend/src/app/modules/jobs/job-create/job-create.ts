import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-job-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-create.html',
  styleUrls: ['./job-create.css'],
})
export class JobCreate {
  private jobService = inject(JobService);
  private router = inject(Router);

  title = '';
  description = '';
  budget: number | null = null;
  category = '';

  loading = false;
  errorMessage = '';

  onSubmit(): void {
    if (!this.title || !this.description || !this.budget || !this.category) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.jobService.createJob({
      title: this.title,
      description: this.description,
      budget: this.budget,
      category: this.category,
    }).subscribe({
      next: () => {
        this.router.navigate(['/jobs/my-postings']);
      },
      error: (err: any) => {
        this.errorMessage = err?.error?.error || 'Erro ao criar job.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}