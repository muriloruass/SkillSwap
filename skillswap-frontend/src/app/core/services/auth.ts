import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app';

  register(data: {
    name: string;
    username: string;
    email: string;
    password: string;
    bio: string;
    skills: string[];
  }) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}