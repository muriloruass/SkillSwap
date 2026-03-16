export interface Review {
  id: number;
  job_id: number;
  reviewer_id: number;
  target_id: number;
  reviewer_name?: string;
  rating: number; // 1 a 5
  comment?: string;
  created_at: string;
}

export interface ReviewCreateRequest {
<<<<<<< HEAD
  target_id: number;
=======
  job_id: number;
>>>>>>> f7f35650c8c1d3a5088bcab0a5d486d1887bb854
  rating: number;
  comment?: string;
}
