import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  getMe() {
    return this.http.get<any>(`${this.apiUrl}/users/me`);
  }

  getPublicProfile(username: string) {
    return this.http.get<any>(`${this.apiUrl}/users/${username}`);
  }
}