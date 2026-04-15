import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  rating_avg: number;
  completed_jobs: number;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = API_BASE_URL;
  private http = inject(HttpClient);

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  getPublicProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/me`, data);
  }
}
