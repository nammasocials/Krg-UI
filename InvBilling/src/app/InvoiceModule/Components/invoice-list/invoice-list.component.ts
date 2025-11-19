import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceServiceService } from '../../Services/invoice-service.service';
import { Vinvoice } from '../../Models/Invoice';
import { customTableHeader, RowOptions, RowOptionsEnum } from '../../../shared/Models/custom-table';
import { switchMap, timer } from 'rxjs';
import { PopupService } from '../../../shared/Service/popup.service';
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
    { headerLabel: 'Total Cost', field: 'totalCost' }
  ];
  options: RowOptions[] = [
    { label: "View", actions: RowOptionsEnum.View, theme: "blue" },
    { label: "Edit", actions: RowOptionsEnum.Edit, theme: "amber" },
    { label: "Delete", actions: RowOptionsEnum.Delete, theme: "red" }
  ]
  invoiceList: Vinvoice[] = [];

  constructor(private invoiceService: InvoiceServiceService, private popupService: PopupService) {
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
}
