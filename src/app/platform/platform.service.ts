import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlatformStats {
  total_users: number;
  active_jobs: number;
  total_value_moved: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private http = inject(HttpClient);
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  getStats(): Observable<PlatformStats> {
    return this.http.get<PlatformStats>(`${this.apiUrl}/platform/stats`);
  }
}