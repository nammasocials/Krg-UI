import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { invoiceInput, invoiceItems } from '../../Models/InvoiceInput';
import { InvoiceServiceService } from '../../Services/invoice-service.service';
import { CommonApiService } from '../../../shared/Service/common-api.service';
import { imageFileValidator } from '../../../shared/Service/custom-validators.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DynamicMultiFormComponent } from '../../../shared/Components/dynamic-multi-form/dynamic-multi-form.component';
import { FormControlConfig, SelectOption } from '../../../shared/Models/dynamic-forms-structure';
import { FORM_CONTROLS_CONFIG } from '../../Constants/form-control-config';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../CustomerModule/Services/customer.service';
import { VCustomer } from '../../../CustomerModule/Models/VCustomer';
import { switchMap, timer } from 'rxjs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VProduct } from '../../../ProductModule/Models/VProduct';
import { ProductService } from '../../../ProductModule/Services/product.service';

@Component({
  selector: 'app-invoice-add-edit',
  standalone: true,
  imports: [RouterOutlet, DynamicMultiFormComponent, ReactiveFormsModule, CommonModule, MatButtonToggleModule],
  templateUrl: './invoice-add-edit.component.html',
  styleUrl: './invoice-add-edit.component.css'
})
export class InvoiceAddEditComponent {
  addedInvoiceItems: number = 0;
  addedInvoiceItemsWithError: Number = 0;
  formControlsConfig: FormControlConfig[] = FORM_CONTROLS_CONFIG;
  @ViewChild('dynamicForm') dynamicForm!: DynamicMultiFormComponent;
  customerListLoading: boolean = true;
  productsLoading: boolean = true;
  customerData: VCustomer[] = [];
  productList: VProduct[] = [];
  form: FormGroup;
  loading = true;
  invoiceFormData: invoiceInput = new invoiceInput();
  invoiceItems: invoiceItems[] = [];
  invoiceCode: string = "";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private invoiceService: InvoiceServiceService, private commonService: CommonApiService,
    private productService: ProductService,
    private customerService: CustomerService) {

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
      EWayBillQR: [{ value: null, disabled: true }, [imageFileValidator(5)]],
      invoiceNo: [this.invoiceFormData ? this.invoiceFormData.invoiceNo : "", [Validators.required, Validators.pattern(/^(?=(?:.*\d){2,})[A-Za-z0-9\-\[\]\(\)#]{3,24}$/)]],
      customerCode: [this.invoiceFormData ? this.invoiceFormData.customerCode : "", [Validators.required]],
      isEwayBillAvailable: [this.invoiceFormData ? this.invoiceFormData.isEwayBillAvailable : null, [Validators.required]],
    });
    this.fetchCustomerList();
    this.fetchProducts();
  }
  ngAfterViewInit() {
    if (this.loading) {
      setTimeout(() => {
        this.loading = false;
      }, 2000); // 3 seconds
    }
  }
  get invoiceNo() {
    return this.form.get('invoiceNo');
  }
  get customerCode() {
    return this.form.get('customerCode');
  }
  get EWayBillQR() {
    return this.form.get('EWayBillQR');
  }
  get isEwayBillAvailable() {
    return this.form.get('isEwayBillAvailable');
  }

  EWayBillAvailabilityOnchange() {
    const IsEWaybillAvailable = this.isEwayBillAvailable?.value;
    this.EWayBillQR?.disable();
    if (IsEWaybillAvailable) {
      this.EWayBillQR?.enable();
    }
  }

  AddProduct() {
    this.dynamicForm.addRow();
  }
  onRowCountChange(count: number) {
    setTimeout(() => {
      this.addedInvoiceItems = count;
    });
  }
  valueChangeEvent(event: any) {
    setTimeout(() => {
      const formArray: FormArray = event.form;
      formArray.controls.forEach((ctrl, index) => {
        const row = ctrl as FormGroup;

        const productId = row.get('productCode')?.value;
        const qtyControl = row.get('quantity');

        if (!qtyControl) return;



        // Fetch max from API or internal lookup
        const maxValue = this.getMaxQty(productId, index);

        qtyControl.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(maxValue)
        ]);

        qtyControl.updateValueAndValidity({ emitEvent: false });
      });
    });
  }
  getMaxQty(productId: string, formIndex: any) {
    const formState = this.dynamicForm.getFormState();
    this.invoiceItems = formState.data.formArray;
    let invoiceItems: invoiceItems[] = formState.data.formArray;
    invoiceItems.splice(formIndex, 1);
    const maxQty = this.productList.filter(F => F.productCode === productId)[0]?.currentStock ?? 0;
    const addedQty = invoiceItems.filter(F => F.productCode === productId)[0]?.quantity ?? 0;
    return Number(maxQty) - Number(addedQty);
  }

  onInvalidRowCountChange(invalidCount: number) {
    setTimeout(() => {
      this.addedInvoiceItemsWithError = invalidCount;
    });
  }

  clearall() {
    this.dynamicForm.clearAll();
  }
  async onSaveAsync() {
    const formState = this.dynamicForm.getFormState();

    if (!formState.valid) {
      console.log("Form invalid");
      return;
    }

    if (!this.form.valid) {
      console.warn('Invalid controls:', this.getInvalidControls());
      this.form.markAllAsTouched();
      return;
    }

    const product: VProductInput = this.form.value; // ✅ your object for internal use

    const formData = new FormData();

    formData.append('ProductName', product.productName);
    formData.append('CurrentStock', product.currentStock.toString());
    formData.append('hsncode', product.hsncode.toString());
    formData.append('unitCost', product.unitCost.toString());
    formData.append('centralGstPer', product.centralGstPer.toString());
    formData.append('stateGstPer', product.stateGstPer.toString());

    // ✅ Add file only if exists
    const file = this.form.get('productLogo')?.value;
    if (file) {
      formData.append('ProductLogo', file);
    }
    if (this.productData?.productCode?.length > 0) {
      formData.append('ProductCode', this.productData.productCode.toString());
      this.productService.editProduct(formData).subscribe({
        next: (response) => {
          toast.success('Product details updated successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Product!');
          this.popupService.updateSubmitFalse(false);
        }
      });
    }
    else {
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          toast.success('Product saved successfully!');
          this.popupService.updateSubmitFalse(true);
        },
        error: (error) => {
          toast.error('Error Saving Product!');
          this.popupService.updateSubmitFalse(false);
        }
      });
    }

    console.log("Form Data:", formState.data.formArray);
    // call API here
  }

  async fetchCustomerList() {
    this.customerListLoading = true;
    timer(500)
      .pipe(switchMap(() => this.customerService.fetchCustomerLists()))
      .subscribe({
        next: (response) => {
          this.customerData = response.data;
          this.customerListLoading = false;
        },
      });
  }
  async fetchProducts() {
    this.productsLoading = true;
    timer(1000)
      .pipe(switchMap(() => this.productService.fetchProductLists()))
      .subscribe({
        next: (response) => {
          var productsSelection: SelectOption[] = [];
          this.productList = response.data;
          productsSelection = this.productList.map(p => ({
            id: p.productCode,   // or p.productName or p.id depending on what you want
            name: p.productName
          }));
          console.log(this.productList);
          this.productList = response.data;
          this.formControlsConfig = this.formControlsConfig.map(control => {
            if (control.type === 'select' && control.name === 'productCode') {
              return {
                ...control,                 // copy other fields
                options: productsSelection  // updated value
              };
            }
            return control;
          });

          this.productsLoading = false;
        },
      });
  }
  onFileChange(event: any) {
    const file = event.target.files && event.target.files.length ? event.target.files[0] : null;
    this.form.patchValue({ EWayBillLogo: file });
    this.form.get('EWayBillQR')?.updateValueAndValidity();
  }
    getInvalidControls() {
    const invalid: string[] = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
