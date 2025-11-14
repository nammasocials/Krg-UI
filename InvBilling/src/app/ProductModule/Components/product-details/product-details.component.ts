import { Component } from '@angular/core';
import { VProduct } from '../../Models/VProduct';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { switchMap, timer } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  logoLoading: boolean = true;
  productDetailsLoading: boolean = true;
  productId: string = "";
  productImageUrl: string | null = null;
  productDetails: VProduct = new VProduct();

  constructor(private router: Router, private route: ActivatedRoute,
    private productService: ProductService
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

  goBack(): void {
    this.router.navigate(['/product']); // Navigate to customer list page
  }
}
