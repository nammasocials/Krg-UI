import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { invoiceInput } from '../../Models/InvoiceInput';
import { InvoiceServiceService } from '../../Services/invoice-service.service';
import { CommonApiService } from '../../../shared/Service/common-api.service';
import { imageFileValidator } from '../../../shared/Service/custom-validators.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DynamicMultiFormComponent } from '../../../shared/Components/dynamic-multi-form/dynamic-multi-form.component';
import { FormControlConfig } from '../../../shared/Models/dynamic-forms-structure';
import { FORM_CONTROLS_CONFIG } from '../../Constants/form-control-config';

@Component({
  selector: 'app-invoice-add-edit',
  standalone: true,
  imports: [RouterOutlet, DynamicMultiFormComponent],
  templateUrl: './invoice-add-edit.component.html',
  styleUrl: './invoice-add-edit.component.css'
})
export class InvoiceAddEditComponent {
  addedInvoiceItems: number = 0;
  addedInvoiceItemsWithError: Number = 0;
  formControlsConfig: FormControlConfig[] = FORM_CONTROLS_CONFIG;
  @ViewChild('dynamicForm') dynamicForm!: DynamicMultiFormComponent;
  form: FormGroup;
  loading = true;
  unitListLoading = true;
  invoiceFormData: invoiceInput = new invoiceInput();
  invoiceCode: string = "";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private invoiceService: InvoiceServiceService, private commonService: CommonApiService) {

    const idParam = this.route.snapshot.paramMap.get('id');
    this.invoiceCode = idParam !== null ? idParam.toString() : "";
    if (this.invoiceCode.length > 0) {
      const nav = this.router.getCurrentNavigation();
      const stateData = nav?.extras.state;
      if (stateData) {
        this.loading = false;
        this.invoiceFormData = stateData['invoiceFormData'];
      } else {
        //this.fetchProductData();
      }
    }

    this.form = this.fb.group({
      EWayBillLogo: [null, [imageFileValidator(5)]],
      invoiceNo: [this.invoiceFormData ? this.invoiceFormData.invoiceNo : "", [Validators.required, Validators.pattern(/^[A-Za-z. ]{5,50}$/)]],
      customerCode: [this.invoiceFormData ? this.invoiceFormData.customerCode : "", [Validators.required, Validators.pattern(/^\d{4}(\d{2})?(\d{2})?$/)]],
      currentStock: [this.invoiceFormData ? this.invoiceFormData.isEwayBillAvailable : "", [Validators.required, Validators.pattern(/^(?:(?:[1-9]\d*)(?:\.\d+)?|0?\.[1-9]\d*)$/)]],
    });
  }
  AddProduct() {
    this.dynamicForm.addRow();
  }
  onRowCountChange(count: number) {
    this.addedInvoiceItems = count;
  }
  onInvalidRowCountChange(count: number) {
    this.addedInvoiceItemsWithError = count;
  }
  clearall(){
    this.dynamicForm.clearAll();
  }
  onSave() {
    const formState = this.dynamicForm.getFormState();

    if (!formState.valid) {
      console.log("Form invalid");
      return;
    }

    console.log("Form Data:", formState.data);
    // call API here
  }
}
