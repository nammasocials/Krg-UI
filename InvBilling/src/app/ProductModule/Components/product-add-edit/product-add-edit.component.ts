import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VProduct } from '../../Models/VProduct';
import { PopupService } from '../../../shared/Service/popup.service';
import { ProductService } from '../../Services/product.service';
import { imageFileValidator } from '../../../shared/Service/custom-validators.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.css'
})
export class ProductAddEditComponent {
  form: FormGroup;
  loading = true;
  productData: VProduct = new VProduct();
  constructor(private fb: FormBuilder, private popupService: PopupService, private productService: ProductService) {

    var signalData = this.popupService.popupState();
    this.productData = signalData.popupChildData;
    if (this.productData.productCode === undefined || this.productData.productCode === 0) {
      this.loading = false;
    }
    this.form = this.fb.group({
      productLogo: [null, [imageFileValidator(5)]],
      productName: [signalData.popupChildData ? this.productData.productName : "", [Validators.required, Validators.pattern(/^[A-Za-z. ]{5,50}$/)]],
      stockCount: [signalData.popupChildData ? this.productData.stockCount : "", [Validators.required, Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
      unitName: [signalData.popupChildData ? this.productData.unitName : "", [Validators.required, Validators.pattern(/^[A-Za-z. ]{5,50}$/)]],
      unitCost: [signalData.popupChildData ? this.productData.unitCost : "", [Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
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

  get productName() {
    return this.form.get('productName');
  }
  get stockCount() {
    return this.form.get('stockCount');
  }
  get unitName() {
    return this.form.get('unitName');
  }
  get unitCost() {
    return this.form.get('unitCost');
  }
  get productLogo() {
    return this.form.get('productLogo');
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files.length ? event.target.files[0] : null;
    this.form.patchValue({ productLogo: file });
    this.form.get('productLogo')?.updateValueAndValidity();
  }
  onSubmitAsync() {
    if (!this.form.valid) {
      console.warn('Invalid controls:', this.getInvalidControls());
      this.form.markAllAsTouched();
      return;
    }

    const product: VProduct = this.form.value; // ✅ your object for internal use

    const formData = new FormData();

    formData.append('ProductName', product.productName);
    formData.append('StockCount', product.stockCount.toString());
    formData.append('UnitName', product.unitName);
    formData.append('UnitCost', product.unitCost.toString());

    // ✅ Add file only if exists
    const file = this.form.get('productLogo')?.value;
    if (file) {
      formData.append('ProductLogo', file);
    }
    if (this.productData.productCode > 0) {
      formData.append('ProductCode', this.productData.productCode.toString());
      this.productService.editProduct(formData).subscribe({
        next: (response) => {
          toast.success('Product details updated successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Product!');
          this.popupService.updateSubmitFalse(false);
        }
      });
    }
    else {
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          toast.success('Product saved successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Product!');
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
