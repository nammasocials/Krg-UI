import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CustomerService } from '../../Services/customer.service';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent {
  loading: boolean = true;
  customerId: number = 0;
  customerImageUrl: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.customerId = idParam !== null ? Number(idParam) : 0;
    this.fetchCustomerImageData();
  }


  fetchCustomerImageData() {
    this.loading = true;
    if (this.customerId != null) {
      timer(500)
        .pipe(switchMap(() => this.customerService.fetchCustomerImage(this.customerId)))
        .subscribe({
          next: (response) => {
            this.customerImageUrl = response;
            this.loading = false;
          },
        });
    }
  }
  goBack(): void {
    this.router.navigate(['/customer']); // Navigate to customer list page
  }

}
