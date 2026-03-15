import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form fields
  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skillsInput = ''; // Comma-separated string

  // UI states
  loading = false;
  errorMessage = '';
  suggestedUsername: string | null = null;

  // Convert skillsInput to array
  get skillsArray(): string[] {
    return this.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  onSubmit(): void {
    // Basic validation
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
        // Auto login after registration
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        
        if (err.status === 409 && err.error?.suggested_username) {
          // Conflict error - username already exists
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