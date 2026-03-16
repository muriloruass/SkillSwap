import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsersService, User } from '../users.service';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-profile.html',
  styleUrls: ['./public-profile.css']
})
export class PublicProfile implements OnInit {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);

  user: User | null = null;
  loading = true;
  errorMessage = '';
  notFound = false;

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.loadProfile(username);
    }
  }

  loadProfile(username: string) {
    this.usersService.getPublicProfile(username).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err: any) => {
        if (err.status === 404) {
          this.notFound = true;
          this.errorMessage = 'User not found';
        } else {
          this.errorMessage = err.error?.error || 'Failed to load profile';
        }
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