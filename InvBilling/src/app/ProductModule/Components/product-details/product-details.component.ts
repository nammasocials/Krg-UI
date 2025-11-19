import { Component } from '@angular/core';
import { VProduct } from '../../Models/VProduct';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { switchMap, timer } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VProductStockHistory } from '../../Models/VProductStock';
import { customTableHeader, RowOptions } from '../../../shared/Models/custom-table';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { PopupService } from '../../../shared/Service/popup.service';
import { ProductAddStockComponent } from '../product-add-stock/product-add-stock.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule,CustomTableComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  logoLoading: boolean = true;
  productDetailsLoading: boolean = true;
  productHistoryLoading: boolean = true;
  productId: string = "";
  productImageUrl: string | null = null;
  productDetails: VProduct = new VProduct();
  productHistory: VProductStockHistory[] = [];
  productHistoryHeaderData: customTableHeader[] = [
    { headerLabel: 'Product Name', field: 'productName' },
    { headerLabel: 'Transaction Type', field: 'transactionType' },
    { headerLabel: 'Quantity', field: 'stockDisplay' },
    { headerLabel: 'Date', field: 'createdOn', fieldPipe: 'date'},
  ];
  productHistoryOptions: RowOptions[] = []

  constructor(private router: Router, private route: ActivatedRoute,
    private productService: ProductService, private popupService: PopupService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    const nav = this.router.getCurrentNavigation();
    const stateData = nav?.extras.state;
    if (stateData) {
      this.productDetailsLoading = false;
      this.productDetails = stateData['productDetails'];
    } else {
      this.fetchProductData();
    }
    this.productId = idParam !== null ? idParam.toString() : "";
    this.fetchProductImageData();
    this.fetchProductHistory();
  }


  fetchProductImageData() {
    this.logoLoading = true;
    if (this.productId != null) {
      timer(500)
        .pipe(switchMap(() => this.productService.fetchProductImage(this.productId)))
        .subscribe({
          next: (response) => {
            this.productImageUrl = response;
            this.logoLoading = false;
          },
        });
    }
  }
  fetchProductHistory() {
    this.productHistoryLoading = true;
    if (this.productId != null) {
      timer(1000)
        .pipe(switchMap(() => this.productService.fetchStockHistory(this.productId)))
        .subscribe({
          next: (response) => {
            this.productHistory = response.data;
            this.productHistoryLoading = false;
          },
        });
    }
  }
  fetchProductData() {
    this.productDetailsLoading = true;
    if (this.productId != null) {
      timer(500)
        .pipe(switchMap(() => this.productService.fetchProductDetails(this.productId)))
        .subscribe({
          next: (response) => {
            this.productDetails = response.data;
            this.productDetailsLoading = false;
          },
        });
    }
  }

  AddStock(){
    this.popupService.openComponentPopup(ProductAddStockComponent, this.productDetails, `Add Stock - ${this.productDetails.productName}`, 'Save', '60%');
  }

  goBack(): void {
    this.router.navigate(['/product']); // Navigate to customer list page
  }
}
