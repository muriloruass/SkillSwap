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
  target_id: number;
  rating: number;
  comment?: string;
}
