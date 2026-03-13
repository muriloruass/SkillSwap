import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


export interface AuthResponse {
  token: string;
  user: any;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  skills: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {  
  private http = inject(HttpClient);
  private router = inject(Router);  
  private apiUrl = 'https://stingray-app-wxhhn.ondigitalocean.app'; 

 
  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
       
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }


  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data).pipe(
      tap((response) => {
       
      })
    );
  }

 
  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}