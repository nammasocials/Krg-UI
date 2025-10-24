import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { customTableHeader } from '../../../shared/Models/custom-table';
import { VCustomer } from '../../Models/VCustomer';
import { switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, CustomTableComponent,CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  loading = true;
  headerData: customTableHeader[] = [
    { headerLabel: 'Customer Name', field: 'CustomerName' },
    { headerLabel: 'Address', field: 'CustomerAddress' },
    { headerLabel: 'GST', field: 'GST' },
  ];
  customerData: VCustomer[] = [];
  constructor(private customerService: CustomerService) {
    this.fetchCustomers();
  }

  fetchCustomers() {
    timer(5000)
      .pipe(switchMap(() => this.customerService.fetchCustomerLists()))
      .subscribe({
        next: (response) => {
          this.customerData = response.data;
          this.loading = false;
        },
      });
  }
}
