export interface Proposal {
  id: number;
  job_id: number;
<<<<<<< HEAD
=======
  job_title?: string;
>>>>>>> f7f35650c8c1d3a5088bcab0a5d486d1887bb854
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
