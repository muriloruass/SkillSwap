import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal, ProposalCreateRequest } from '../../models/proposal.model';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';
  private http = inject(HttpClient);

  /**
   * Comunica com a API: POST /jobs/<id>/proposals
   * Envia o valor (price) e a carta (cover_letter) do Freelancer para uma vaga.
   * IMPORTANTE: O "AuthInterceptor" global já cuidará de inserir o Bearer Token dessa chamada!
   */
  createProposal(jobId: string, proposalData: ProposalCreateRequest): Observable<Proposal> {
    return this.http.post<Proposal>(`${this.apiUrl}/jobs/${jobId}/proposals`, proposalData);
  }

  getMyBids(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.apiUrl}/proposals/my-bids`);
  }

  deleteProposal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/proposals/${id}`);
  }
}
