import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { imageFileValidator } from './../../../shared/Service/custom-validators.service';
import { PopupService } from '../../../shared/Service/popup.service';
import { VCustomer } from '../../Models/VCustomer';
import { CustomerService } from '../../Services/customer.service';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-customer-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-add-edit.component.html',
  styleUrl: './customer-add-edit.component.css'
})
export class CustomerAddEditComponent {
  form: FormGroup;
  loading = true;
  customerData: VCustomer = new VCustomer();
  constructor(private fb: FormBuilder, private popupService: PopupService, private customerService: CustomerService) {

    var signalData = this.popupService.popupState();
    this.customerData = signalData.popupChildData;
    if (this.customerData.customerCode === undefined || this.customerData.customerCode === 0) {
      this.loading = false;
    }
    this.form = this.fb.group({
      companyLogo: [null, [imageFileValidator(5)]],
      customerName: [signalData.popupChildData ? this.customerData.customerName : "", [Validators.required, Validators.pattern(/^[A-Za-z. ]{5,50}$/)]],
      customerEmail: [signalData.popupChildData ? this.customerData.customerEmail : "", [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
      contactNo: [signalData.popupChildData ? this.customerData.contactNo : "", [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      secnContactNo: [signalData.popupChildData ? this.customerData.secnContactNo : "", [Validators.pattern(/^[6-9]\d{9}$/)]],
      gst: [signalData.popupChildData ? this.customerData.gst : "", [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      customerAddress: [signalData.popupChildData ? this.customerData.customerAddress : "", [Validators.required, Validators.pattern(/^[A-Za-z0-9\s,.\-\/\\()#&]{5,200}/)]],
    });
    effect(() => {
      const state = this.popupService.popupState();

      if (state.submitPopup) {
        console.log('Submit popup triggered!');
        this.onSubmitAsync();
        // this.popupService.popupState.update(s => ({
        //   ...s,
        //   submitPopup: false,
        //   showPopup: false
        // }));
      }
    });

  }
  ngAfterViewInit() {
    if (this.loading) {
      setTimeout(() => {
        this.loading = false;
      }, 2000); // 3 seconds
    }
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
  get companyLogo() {
    return this.form.get('companyLogo');
  }
  get customerAddress() {
    return this.form.get('customerAddress');
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files.length ? event.target.files[0] : null;
    this.form.patchValue({ companyLogo: file });
    this.form.get('companyLogo')?.updateValueAndValidity();
  }

  onSubmitAsync() {
    if (!this.form.valid) {
      console.warn('Invalid controls:', this.getInvalidControls());
      this.form.markAllAsTouched();
      return;
    }

    const customer: VCustomer = this.form.value; // ✅ your object for internal use

    const formData = new FormData();

    formData.append('CustomerName', customer.customerName);
    formData.append('CustomerEmail', customer.customerEmail);
    formData.append('ContactNo', customer.contactNo);
    formData.append('SecnContactNo', customer.secnContactNo || '');
    formData.append('Gst', customer.gst);
    formData.append('CustomerAddress', customer.customerAddress);

    // ✅ Add file only if exists
    const file = this.form.get('companyLogo')?.value;
    if (file) {
      formData.append('CompanyLogo', file);
    }
    if (this.customerData.customerCode > 0) {
      formData.append('CustomerCode', this.customerData.customerCode.toString());
      this.customerService.editCustomer(formData).subscribe({
        next: (response) => {
          toast.success('Customer details updated successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Customer!');
          this.popupService.updateSubmitFalse(false);
        }
      });
    }
    else {
      this.customerService.addCustomer(formData).subscribe({
        next: (response) => {
          toast.success('Customer saved successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Customer!');
          this.popupService.updateSubmitFalse(false);
        }
      });
    }

  }
  getInvalidControls() {
    const invalid: string[] = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }


}
