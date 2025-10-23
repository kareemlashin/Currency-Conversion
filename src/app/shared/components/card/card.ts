import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card',

  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {

  @Input() variant: 'default' | 'gradient' | 'outlined' = 'default';
  
  @Input() elevation: 'none' | 'low' | 'medium' | 'high' = 'medium';
  
  @Input() title = '';
  
  @Input() hasFooter = false;
}
