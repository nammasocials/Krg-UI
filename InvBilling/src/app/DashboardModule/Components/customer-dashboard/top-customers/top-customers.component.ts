import { Component } from '@angular/core';
import { customTableHeader, options } from '../../../../shared/Models/custom-table';
import { VCustomer } from '../../../../CustomerModule/Models/VCustomer';
import { CustomerService } from '../../../../CustomerModule/Services/customer.service';
import { switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from '../../../../shared/Components/custom-table/custom-table.component';

@Component({
  selector: 'app-top-customers',
  standalone: true,
  imports: [CustomTableComponent,CommonModule],
  templateUrl: './top-customers.component.html',
  styleUrl: './top-customers.component.css'
})
export class TopCustomersComponent {
  loading = true;
  customerForDelete?: VCustomer = new VCustomer();
  options: options[] = []
  headerData: customTableHeader[] = [
    { headerLabel: 'Customer Name', field: 'customerName', },
    { headerLabel: 'Email', field: 'customerEmail' },
    { headerLabel: 'Contact No.', field: 'contactNo' },
  ];
  customerData: VCustomer[] = [];
  constructor(private customerService: CustomerService) {
    this.fetchTopCustomers();
  }
  fetchTopCustomers() {
    this.loading = true;
    timer(1000)
      .pipe(switchMap(() => this.customerService.fetchCustomerLists()))
      .subscribe({
        next: (response) => {
          this.customerData = response.data;
          console.log(this.customerData);
          this.loading = false;
        },
      });
  }
}
