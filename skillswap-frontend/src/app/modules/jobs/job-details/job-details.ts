import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JobService } from '../../../core/services/job.service';
import { ProposalService } from '../../../core/services/proposal';
import { Job } from '../../../models/job.model';

import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './job-details.html',
  styleUrls: ['./job-details.css']
})
export class JobDetailsComponent implements OnInit {
  job: Job | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // Lógica da Proposta
  proposalForm: FormGroup;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private proposalService: ProposalService,
    private fb: FormBuilder
  ) {
    // Inicialização da caixa de preenchimento de proposta
    this.proposalForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(1)]],
      cover_letter: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    // Pegar o 'id' que passamos na URL (ex: localhost:4200/jobs/123 -> id = 123)
    const jobId = this.route.snapshot.paramMap.get('id');

    if (jobId) {
      this.loadJobDetails(jobId);
    } else {
      this.isLoading = false;
      this.errorMessage = "Invalid Job ID provided in the URL.";
    }
  }

  loadJobDetails(id: string): void {
    this.jobService.getJobById(id).subscribe({
      next: (jobData) => {
        this.job = jobData;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = `Could not load job details. (Status: ${err.status})`;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Volta pra home (search)
  }

  // Ação clicada no HTML ao enviar a proposta de emprego
  submitProposal(): void {
    if (this.proposalForm.invalid || !this.job) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    
    const newProposalData = {
      price: this.proposalForm.get('price')?.value,
      cover_letter: this.proposalForm.get('cover_letter')?.value
    };

    // Chamada oficial da Nossa API de Propostas (Via Serviço)
    this.proposalService.createProposal(this.job.id.toString(), newProposalData).subscribe({
      next: (response) => {
        // Sucesso: Esconde o formulaŕio, desativa botões de loading e exibe a marca verde.
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.proposalForm.reset();
        console.log('Proposal created elegantly:', response);
      },
      error: (err) => {
        this.isSubmitting = false;
        // Backend pode acusar 409 Se o Freelancer tentar se candidatar duas vezes
        if (err.status === 409) {
           this.errorMessage = "You have already submitted a proposal for this job.";
        } else {
           this.errorMessage = err.error?.error || 'Failed to submit proposal. Please try again.';
        }
      }
    });
  }
}
