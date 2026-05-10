import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { VinvoiceDetail } from '../../Models/Invoice';
import { switchMap, timer } from 'rxjs';
import { InvoiceServiceService } from '../../Services/invoice-service.service';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {

  logoLoading: boolean = true;
  InvoiceDetailsLoading: boolean = true;
  InvoiceId: string = "";
  customerImageUrl: string | null = null;
  InvoiceDetails: VinvoiceDetail = new VinvoiceDetail();

  constructor(private router: Router, private route: ActivatedRoute, 
    private invoiceService: InvoiceServiceService) {
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
          },
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/invoice']); // Navigate to customer list page
  }

}
