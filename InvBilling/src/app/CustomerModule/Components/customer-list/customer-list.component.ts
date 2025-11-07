import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { customTableHeader, customTableOptionsEmitter, optionsEnum } from '../../../shared/Models/custom-table';
import { VCustomer } from '../../Models/VCustomer';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../../shared/Service/popup.service';
import { CustomerAddEditComponent } from '../customer-add-edit/customer-add-edit.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  loading = true;
  customerForDelete?: VCustomer = new VCustomer();
  headerData: customTableHeader[] = [
    { headerLabel: 'Customer Name', field: 'customerName' },
    { headerLabel: 'Email', field: 'customerEmail' },
    { headerLabel: 'Contact No.', field: 'contactNo' },
    { headerLabel: 'GST', field: 'gst' },
    { headerLabel: 'Options', field: 'options' },
  ];
  customerData: VCustomer[] = [];
  constructor(private customerService: CustomerService, 
    private router: Router,private popupService: PopupService) {
    this.fetchCustomers();
    effect(() => {
      const state = this.popupService.popupState();

      if (state.submitPopup === false) {
        this.fetchCustomers();
      }
      if (state.isConfirmed === true) {
        this.customerForDelete = state.popupChildData;
        this.onDeleteCustomerAsync();
      }
      else {
        this.customerForDelete = undefined;
      }
    });
  }


  fetchCustomers() {
    this.loading = true;
    timer(1500)
      .pipe(switchMap(() => this.customerService.fetchCustomerLists()))
      .subscribe({
        next: (response) => {
          this.customerData = response.data;
          console.log(this.customerData);
          this.loading = false;
        },
      });
  }
  OpenOptions(action: customTableOptionsEmitter) {
    if (action.type === optionsEnum.View) {
      this.ViewCustomer(action.data);
    }
    if (action.type === optionsEnum.Delete) {
      this.DeleteCustomerPopup(action.data);
    }
    if (action.type === optionsEnum.Edit) {
      this.EditCustomerPopup(action.data);
    }
  }
  AddCustomerPopup() {
    this.popupService.openComponentPopup(CustomerAddEditComponent, {}, 'Add Customer Details', 'Save', '60%');
  }

  EditCustomerPopup(selectedCustomer: VCustomer) {
    this.popupService.openComponentPopup(CustomerAddEditComponent, selectedCustomer, `Edit - ${selectedCustomer.customerName}`, 'Save', '60%');
  }

  ViewCustomer(selectedCustomer: VCustomer) {
    this.router.navigate([`/customer/${selectedCustomer.customerCode}`]);

  }
  DeleteCustomerPopup(selectedCustomer: VCustomer) {
    this.popupService.popupState.set({
      showPopup: true,
      popupChildData: selectedCustomer,
      popupTitle: 'Confrimation',
      popupMessage: `Are you sure you want to delete this customer - ${selectedCustomer.customerName} ? This action cannot be undone.`,
      popupFooterType: 'confirm',
      popupWidth: '35%',
    });
  }
  async onDeleteCustomerAsync() {
    try {
      if (this.customerForDelete) {
        const res = await firstValueFrom(this.customerService.deleteCustomer(this.customerForDelete?.customerCode));

        if (res.code === 200) {
          this.popupService.popupState.set({
            showPopup: true,
            popupTitle: 'Information',
            popupMessage: `Record for - ${this.customerForDelete.customerName} deleted successfully`,
            popupFooterType: 'ok',
            popupWidth: '35%',
          });
        } else {
          this.popupService.popupState.set({
            showPopup: true,
            popupTitle: 'Error',
            popupMessage: `unable to delete customer details for - ${this.customerForDelete.customerName}`,
            popupFooterType: 'ok',
            popupWidth: '35%',
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      this.fetchCustomers();
      this.customerForDelete = undefined;
    }
  }
}
