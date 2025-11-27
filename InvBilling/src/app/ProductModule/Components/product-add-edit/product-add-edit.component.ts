import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VProduct, VProductInput } from '../../Models/VProduct';
import { PopupService } from '../../../shared/Service/popup.service';
import { ProductService } from '../../Services/product.service';
import { imageFileValidator } from '../../../shared/Service/custom-validators.service';
import { toast } from 'ngx-sonner';
import { VConstant } from '../../../shared/Models/commonModels';
import { CommonApiService } from '../../../shared/Service/common-api.service';

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
  unitListLoading = true;
  productData: VProductInput = new VProductInput();
  productUnitLists: VConstant[] = [];
  constructor(private fb: FormBuilder, private popupService: PopupService,
    private productService: ProductService, private commonService: CommonApiService) {

    var signalData = this.popupService.popupState();
    this.productData = signalData.popupChildData;

    if (this.productData.productCode === undefined || this.productData.productCode.length <= 0) {
      this.loading = false;
    }
    this.unitListLoading = true;
    this.fetchUnitList();
    this.form = this.fb.group({
      productLogo: [null, [imageFileValidator(5)]],
      productName: [signalData.popupChildData ? this.productData.productName : "", [Validators.required, Validators.pattern(/^[A-Za-z. ]{5,50}$/)]],
      hsncode: [signalData.popupChildData ? this.productData.hsncode : "", [Validators.required, Validators.pattern(/^\d{4}(\d{2})?(\d{2})?$/)]],
      currentStock: [signalData.popupChildData ? this.productData.currentStock : "", [Validators.required, Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
      unitType: [signalData.popupChildData ? this.productData.unitType : 0, [Validators.required, Validators.min(1)]],
      unitCost: [signalData.popupChildData ? this.productData.unitCost : "", [Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
      centralGstPer : [signalData.popupChildData ? this.productData.centralGstPer : "", [Validators.required, Validators.min(0), Validators.max(100)]],
      stateGstPer : [signalData.popupChildData ? this.productData.stateGstPer : "", [Validators.required, Validators.min(0), Validators.max(100)]],
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
  get currentStock() {
    return this.form.get('currentStock');
  }
  get unitType() {
    return this.form.get('unitType');
  }
  get unitCost() {
    return this.form.get('unitCost');
  }
  get centralGstPer() {
    return this.form.get('centralGstPer');
  }
  get stateGstPer() {
    return this.form.get('stateGstPer');
  }
  get hsncode() {
    return this.form.get('hsncode');
  }
  get productLogo() {
    return this.form.get('productLogo');
  }

  fetchUnitList() {
    this.unitListLoading = true;
    this.commonService.fetchProductUnitLists().subscribe({
      next: (response) => {
        this.unitListLoading = false;
        this.productUnitLists = response.data;
      },
      error: (error) => {
        this.unitListLoading = false;
        toast.error('Error fetching unit types!');
      }
    });
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

    const product: VProductInput = this.form.value; // ✅ your object for internal use

    const formData = new FormData();

    formData.append('ProductName', product.productName);
    formData.append('CurrentStock', product.currentStock.toString());
    formData.append('unitType', product.unitType.toString());
    formData.append('hsncode', product.hsncode.toString());
    formData.append('unitCost', product.unitCost.toString());
    formData.append('centralGstPer', product.centralGstPer.toString());
    formData.append('stateGstPer', product.stateGstPer.toString());

    // ✅ Add file only if exists
    const file = this.form.get('productLogo')?.value;
    if (file) {
      formData.append('ProductLogo', file);
    }
    if (this.productData?.productCode?.length > 0) {
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
