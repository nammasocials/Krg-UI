import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { imageFileValidator } from './../../../shared/Service/custom-validators.service';

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
      contactNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      secnContactNo: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      gst: ['', [Validators.required,Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      companyLogo: ['', null, [imageFileValidator(5)]]
    });
  }
  get customerName() {
    return this.form.get('customerName');
  }
  get customerEmail() {
    return this.form.get('customerEmail');
  }
  get contactNo() {
    return this.form.get('contactNo');
  }
  get secnContactNo() {
    return this.form.get('secnContactNo');
  }
  get gst() {
    return this.form.get('gst');
  }
   onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.patchValue({ image: input.files[0] });
      this.form.get('image')?.updateValueAndValidity();
    } else {
      this.form.patchValue({ image: null });
    }
  }
}
