import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform } from '../../core/services/platform';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private platform = inject(Platform);

  stats: any = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.platform.getStats().subscribe({
      next: (data: any) => {
        this.stats = data;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar estatísticas.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}