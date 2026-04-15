import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api.config';

export interface PlatformStats {
  total_users: number;
  active_jobs: number;
  total_value_moved: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private http = inject(HttpClient);
  private apiUrl = API_BASE_URL;

  getStats(): Observable<PlatformStats> {
    return this.http.get<PlatformStats>(`${this.apiUrl}/platform/stats`);
  }
}
