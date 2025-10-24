import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-add-edit.component.html',
  styleUrl: './customer-add-edit.component.css'
})
export class CustomerAddEditComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder,) {
    this.form = this.fb.group({
      customerName: ['', [Validators.required, Validators.pattern(/^[A-Za-z.]{5,50}$/)]],
      customerEmail: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
    });
  }
  get customerName() {
    return this.form.get('customerName');
  }
  get customerEmail() {
    return this.form.get('customerEmail');
  }
}
