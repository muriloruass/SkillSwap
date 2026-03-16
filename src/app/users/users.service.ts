import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }

  getPublicProfile(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`);
  }
}