export interface Proposal {
  id: number;
  job_id: number;
  freelancer_id: number;
  freelancer_name?: string;
  price: number;
  cover_letter: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface ProposalCreateRequest {
  price: number;
  cover_letter: string;
}
