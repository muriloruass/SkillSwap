import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.css']
})
export class ErrorMessageComponent {
  //print a message when an error occurs
  @Input() message: string | null = null;
}
