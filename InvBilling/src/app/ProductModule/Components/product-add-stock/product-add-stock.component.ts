import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VProductInput } from '../../Models/VProduct';
import { ProductService } from '../../Services/product.service';
import { PopupService } from '../../../shared/Service/popup.service';
import { CommonModule } from '@angular/common';

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
      productName: [{value : signalData.popupChildData ? this.productData.productName : "",disabled: true }],
      currentStock: [{value : signalData.popupChildData ? this.productData.currentStock : "",disabled: true }],
      quantity: [signalData.popupChildData ? this.productData.unitType : 0, [Validators.required, Validators.min(1)]],
    });
  }
    ngAfterViewInit() {
    if (this.loading) {
      setTimeout(() => {
        this.loading = false;
      }, 1500); // 3 seconds
    }
  }
}
