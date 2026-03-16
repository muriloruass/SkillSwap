import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-profile.html',
  styleUrls: ['./my-profile.css']
})
export class MyProfile implements OnInit {
  private usersService = inject(UsersService);

  user: User | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.usersService.getMyProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.error?.error || 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  getRatingStars(rating: number): string[] {
    const stars: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push('★');
      } else if (i < rating) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }
    return stars;
  }
}