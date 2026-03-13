export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  rating_avg?: number;
  completed_jobs?: number;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}