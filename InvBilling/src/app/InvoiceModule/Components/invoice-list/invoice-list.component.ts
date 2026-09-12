import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InvoiceServiceService } from '../../Services/invoice-service.service';
import { Vinvoice } from '../../Models/Invoice';
import { customTableHeader, customTableOptionsEmitter, RowOptions, RowOptionsEnum } from '../../../shared/Models/custom-table';
import { switchMap, timer } from 'rxjs';
import { PopupService } from '../../../shared/Service/popup.service';
import { FileDownloadService } from '../../../shared/Service/file-download.service';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css'
})
export class InvoiceListComponent {

  loading = true;
  headerData: customTableHeader[] = [
    { headerLabel: 'Invoice No.', field: 'invoiceNo' },
    { headerLabel: 'Customer', field: 'customerName' },
    { headerLabel: 'GST', field: 'gst' },
    { headerLabel: 'Total Cost', field: 'totalCost' },
    { headerLabel: 'Options', field: 'options' },
  ];
  options: RowOptions[] = [
    { label: "View", actions: RowOptionsEnum.View, theme: "blue" },
    { label: "PDF", actions: RowOptionsEnum.Pdf, theme: "amber" },
    // { label: "Edit", actions: RowOptionsEnum.Edit, theme: "amber" },
    // { label: "Delete", actions: RowOptionsEnum.Delete, theme: "red" }
  ]
  invoiceList: Vinvoice[] = [];

  pdfDownloadingFor: string | null = null;

  OpenOptions(action: customTableOptionsEmitter) {
    if (action.type === RowOptionsEnum.View) {
      this.ViewInvioice(action.data);
    }
    if (action.type === RowOptionsEnum.Pdf) {
      this.DownloadInvoicePdf(action.data);
    }
    // if (action.type === RowOptionsEnum.Delete) {
    //   this.DeleteCustomerPopup(action.data);
    // }
    // if (action.type === RowOptionsEnum.Edit) {
    //   this.EditCustomerPopup(action.data);
    // }
  }

  ViewInvioice(selectedInvoice: Vinvoice) {
    this.router.navigate([`/invoice/${selectedInvoice.invoiceCode}`], { state: { selectedInvoice: selectedInvoice } });

  }

  /** Downloads the RDLC-rendered PDF for one invoice. */
  DownloadInvoicePdf(selectedInvoice: Vinvoice) {
    this.pdfDownloadingFor = selectedInvoice.invoiceCode;
    this.invoiceService.downloadInvoicePdf(selectedInvoice.invoiceCode).subscribe({
      next: (response) => {
        this.fileDownloadService.saveResponse(response, `Invoice_${selectedInvoice.invoiceNo}.pdf`);
        this.pdfDownloadingFor = null;
      },
      error: () => {
        this.pdfDownloadingFor = null;
      }
    });
  }

  constructor(private invoiceService: InvoiceServiceService, private popupService: PopupService,
    private router: Router,
    private fileDownloadService: FileDownloadService,
  ) {
    this.fetchInvoices();
    effect(() => {
      const state = this.popupService.popupState();
      if (state.submitPopup === false) {
        this.fetchInvoices();
      }
    });
  }

  fetchInvoices() {
    this.loading = true;
    timer(1000)
      .pipe(switchMap(() => this.invoiceService.fetchInvoiceList()))
      .subscribe({
        next: (response) => {
          this.invoiceList = response.data;
          console.log(this.invoiceList);
          this.loading = false;
        },
      });
  }
  AddInvoice() {
    this.router.navigate(['/new-invoice']);
  }
}
