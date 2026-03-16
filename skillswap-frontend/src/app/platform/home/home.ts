import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlatformService, PlatformStats } from '../platform.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private platformService = inject(PlatformService);

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
}
