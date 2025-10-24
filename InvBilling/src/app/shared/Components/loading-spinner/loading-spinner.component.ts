import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../Service/loading-service.service';
import { Constant } from '../../../constants';

@Component({
  selector: 'app-loading-spinner',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  readonly Constant = Constant;
  loading$ = inject(LoadingService).loading$;
}
