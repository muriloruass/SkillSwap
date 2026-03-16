import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';  
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],  
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  
  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skillsInput = '';  
 
  loading = false;
  errorMessage = '';
  suggestedUsername: string | null = null;

  
  get skillsArray(): string[] {
    return this.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  onSubmit(): void {
 
    if (!this.name || !this.username || !this.email || !this.password || !this.bio || !this.skillsInput) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.skillsArray.length === 0) {
      this.errorMessage = 'Please add at least one skill.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.suggestedUsername = null;

    const registerData = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      skills: this.skillsArray
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        
        alert('Account created successfully! Please login below.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        
        if (err.status === 409 && err.error?.suggested_username) {
       
          this.errorMessage = err.error.error;
          this.suggestedUsername = err.error.suggested_username;
        } else if (err.status === 400) {
          this.errorMessage = 'Invalid data. Please check your fields.';
        } else {
          this.errorMessage = err.error?.error || 'Registration failed. Please try again.';
        }
      }
    });
  }

  useSuggestedUsername(): void {
    if (this.suggestedUsername) {
      this.username = this.suggestedUsername;
      this.suggestedUsername = null;
    }
  }
}