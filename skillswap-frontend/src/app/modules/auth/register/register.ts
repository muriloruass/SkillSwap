import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);

  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skills = '';

  errorMessage = '';
  loading = false;

  onSubmit() {
    if (!this.name || !this.username || !this.email || !this.password || !this.bio || !this.skills) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.register({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      skills: this.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => !!skill),
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409 && err.error?.suggested_username) {
          this.errorMessage = `Username já em uso. Sugestão: ${err.error.suggested_username}`;
        } else {
          this.errorMessage = err.error?.error || 'Register falhou.';
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}