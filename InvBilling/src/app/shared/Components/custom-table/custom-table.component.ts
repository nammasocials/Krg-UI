import { Component, Input } from '@angular/core';
import { customTableHeader } from '../../Models/custom-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {

  @Input() data: any[] = [];
  @Input() headerData: customTableHeader[] = [];

  constructor() {

  }
}
