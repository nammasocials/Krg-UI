import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  // Variables
  @Input() title: string = 'Modal Title';
  @Input() content: string = ''; // simple text
  @Input() showConfirmButton: boolean = false;

  // Component injection
  @Input() contentComponent: any = null; // Component class
  @Input() contentInjector?: Injector; // optional, undefined by default

  isOpen = false;

  // Constructor and Oninit
  constructor(){

  }

  // Fucntions
  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  confirm() {
    console.log('Confirmed!');
    this.close();
  }
}
