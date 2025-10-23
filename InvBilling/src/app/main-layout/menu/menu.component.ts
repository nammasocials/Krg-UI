import { Component } from '@angular/core';
import { Constant } from '../../constants';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  readonly Constant = Constant;
}
