export interface Job {
  id: number;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed';
  employer_id: number;
  employer_name?: string; // Algumas APIs retornam o nome junto
  created_at: string;
}

export interface JobSearchRequest {
  category?: string;
  status?: string;
  min_budget?: number;
}
