
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone: true
})
export class ButtonComponent {

  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;

  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}