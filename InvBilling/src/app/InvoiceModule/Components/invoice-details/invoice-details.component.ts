import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { VinvoiceDetail } from '../../Models/Invoice';
import { switchMap, timer } from 'rxjs';
import { InvoiceServiceService } from '../../Services/invoice-service.service';
import { CustomerService } from '../../../CustomerModule/Services/customer.service';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {

  EwayBillLoading: boolean = true;
  customerImageLoading : boolean = true;
  EwayBillImageUrl: string | null = null;
  InvoiceDetailsLoading: boolean = true;
  InvoiceId: string = "";
  customerId : string = "";
  customerImageUrl: string | null = null;
  InvoiceDetails: VinvoiceDetail = new VinvoiceDetail();

  constructor(private router: Router, private route: ActivatedRoute,
    private invoiceService: InvoiceServiceService,
    private customerService: CustomerService,) {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.InvoiceId = idParam !== null ? idParam.toString() : "";
    const nav = this.router.getCurrentNavigation();
    const stateData = nav?.extras.state;
    if (stateData) {
      this.InvoiceDetailsLoading = false;
      this.InvoiceDetails = stateData['selectedInvoice'];
    } else {
      this.fetchInvoiceDetails();
    }
    //this.fetchCustomerImageData();
    this.fetchEwayBillImageData();
  }

  fetchInvoiceDetails() {
    this.InvoiceDetailsLoading = true;
    if (this.InvoiceId != null) {
      timer(500)
        .pipe(switchMap(() => this.invoiceService.fetchInvoiceDetails(this.InvoiceId)))
        .subscribe({
          next: (response) => {
            this.InvoiceDetails = response.data;
            this.InvoiceDetailsLoading = false;
            this.customerId = response.data.customerCode;
            this.fetchCustomerImageData(this.customerId);
          },
        });
    }
  }
  fetchEwayBillImageData() {
    this.EwayBillLoading = true;
    if (this.InvoiceId != null) {
      timer(500)
        .pipe(switchMap(() => this.invoiceService.fetchEwayBillImage(this.InvoiceId)))
        .subscribe({
          next: (response) => {
            this.EwayBillImageUrl = response;
            this.EwayBillLoading = false;
          },
        });
    }
  }
  fetchCustomerImageData(customerCode : string) {
    this.customerImageLoading = true;
    if (this.InvoiceId != null) {
      timer(500)
        .pipe(switchMap(() => this.customerService.fetchCustomerImage(customerCode)))
        .subscribe({
          next: (response) => {
            this.customerImageUrl = response;
            this.customerImageLoading = false;
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/invoice']); // Navigate to customer list page
  }

}
