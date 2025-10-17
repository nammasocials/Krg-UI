import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guidlines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guidlines.component.html',
  styleUrl: './guidlines.component.css'
})
export class GuidlinesComponent {
  @Input() isPassword: boolean = false;
}
