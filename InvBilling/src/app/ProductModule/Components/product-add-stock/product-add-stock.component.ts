import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VProductInput } from '../../Models/VProduct';
import { VProductAddStock } from '../../Models/VProductStock';
import { ProductService } from '../../Services/product.service';
import { PopupService } from '../../../shared/Service/popup.service';
import { CommonModule } from '@angular/common';
import { NgxSonnerToaster, toast } from 'ngx-sonner';

@Component({
  selector: 'app-product-add-stock',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add-stock.component.html',
  styleUrl: './product-add-stock.component.css'
})
export class ProductAddStockComponent {
  form: FormGroup;
  loading = true;
  productData: VProductInput = new VProductInput();
  constructor(private fb: FormBuilder, private popupService: PopupService,
    private productService: ProductService) {

    var signalData = this.popupService.popupState();
    this.productData = signalData.popupChildData;

    if (this.productData.productCode === undefined || this.productData.productCode.length <= 0) {
      this.loading = false;
    }
    this.form = this.fb.group({
      productName: [{ value: signalData.popupChildData ? this.productData.productName : "", disabled: true }],
      currentStock: [{ value: signalData.popupChildData ? this.productData.currentStock : "", disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1), Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
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
  get quantity() {
    return this.form.get('quantity');
  }
  ngAfterViewInit() {
    if (this.loading) {
      setTimeout(() => {
        this.loading = false;
      }, 1500); // 3 seconds
    }
  }
  onSubmitAsync() {
    if (!this.form.valid) {
      console.warn('Invalid controls:', this.getInvalidControls());
      this.form.markAllAsTouched();
      return;
    }

    const product: VProductAddStock = this.form.value; // ✅ your object for internal use

    const formData = new FormData();

    formData.append('ProductCode', this.productData.productCode);
    formData.append('Quantity', product.quantity.toString());
    this.productService.addStock(formData).subscribe({
      next: (response) => {
        toast.success('Stock added successfully!');
        this.popupService.updateSubmitFalse(true);
      },
      error: (error) => {
        toast.error('Error adding Stock!');
        this.popupService.updateSubmitFalse(false);
      }
    });

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
