import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformService, PlatformStats } from '../platform.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private platformService = inject(PlatformService);
  public authService = inject(AuthService);

  stats: PlatformStats | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.platformService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Failed to load stats';
        this.loading = false;
      }
    });
  }

  formatLargeValue(value: number): string {
    if (!value) return '$0';
    if (value >= 1e12) return '> $1T'; 
    if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return '$' + (value / 1e3).toFixed(1) + 'K';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }
}
