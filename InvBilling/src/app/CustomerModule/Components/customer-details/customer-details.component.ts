import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CustomerService } from '../../Services/customer.service';
import { switchMap, timer } from 'rxjs';
import { VCustomer } from '../../Models/VCustomer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  logoLoading: boolean = true;
  customerDetailsLoading: boolean = true;
  customerId: string = "";
  customerImageUrl: string | null = null;
  customerDetails: VCustomer = new VCustomer();

  constructor(private router: Router, private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.customerId = idParam !== null ? idParam.toString() : "";
    const nav = this.router.getCurrentNavigation();
    const stateData = nav?.extras.state;
    if (stateData) {
      this.customerDetailsLoading = false;
      this.customerDetails = stateData['customerDetails'];
    } else {
      this.fetchCustomerData();
    }
    this.fetchCustomerImageData();
  }


  fetchCustomerImageData() {
    this.logoLoading = true;
    if (this.customerId != null) {
      timer(500)
        .pipe(switchMap(() => this.customerService.fetchCustomerImage(this.customerId)))
        .subscribe({
          next: (response) => {
            this.customerImageUrl = response;
            this.logoLoading = false;
          },
        });
    }
  }
  fetchCustomerData() {
    this.customerDetailsLoading = true;
    if (this.customerId != null) {
      timer(500)
        .pipe(switchMap(() => this.customerService.fetchCustomerDetails(this.customerId)))
        .subscribe({
          next: (response) => {
            this.customerDetails = response.data;
            this.customerDetailsLoading = false;
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/customer']); // Navigate to customer list page
  }

}
