import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Platform {
  private http = inject(HttpClient);
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  getStats() {
    return this.http.get<any>(`${this.apiUrl}/platform/stats`);
  }
}