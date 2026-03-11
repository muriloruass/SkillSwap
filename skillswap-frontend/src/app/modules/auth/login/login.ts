import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email e password são obrigatórios.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login({
      email: this.email,
      password: this.password,
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.errorMessage = err?.error?.error || 'Login falhou.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}