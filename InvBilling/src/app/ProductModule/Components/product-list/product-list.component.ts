import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VProduct } from '../../Models/VProduct';
import { customTableHeader, customTableOptionsEmitter, RowOptions, RowOptionsEnum } from '../../../shared/Models/custom-table';
import { ProductService } from '../../Services/product.service';
import { PopupService } from '../../../shared/Service/popup.service';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from '../../../shared/Components/custom-table/custom-table.component';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { ProductAddStockComponent } from '../product-add-stock/product-add-stock.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  loading = true;
  productForDelete?: VProduct = new VProduct();
  headerData: customTableHeader[] = [
    { headerLabel: 'Product Name', field: 'productName' },
    { headerLabel: 'HSN Code', field: 'hsncode' },
    { headerLabel: 'Available Stock', field: 'currentStock' },
    { headerLabel: 'Unit Type', field: 'unitNameDetail' },
    { headerLabel: 'Cost per Unit', field: 'unitCost' },
    { headerLabel: 'Intra-State GST', field: 'intraStateTotal' },
    { headerLabel: 'Inter-State GST', field: 'interStateTotal' },
    { headerLabel: 'Options', field: 'options' },
  ];
  options: RowOptions[] = [
    { label: "View", actions: RowOptionsEnum.View, theme: "blue" },
    { label: "Add Stock", actions: RowOptionsEnum.AddChild, theme: "purple" },
    { label: "Edit", actions: RowOptionsEnum.Edit, theme: "amber" },
    { label: "Delete", actions: RowOptionsEnum.Delete, theme: "red" }
  ]
  productData: VProduct[] = [];

  constructor(private productService: ProductService,
    private router: Router, private popupService: PopupService) {
    this.fetchProducts();
    effect(() => {
      const state = this.popupService.popupState();

      if (state.submitPopup === false) {
        this.fetchProducts();
      }
      if (state.isConfirmed === true) {
        this.productForDelete = state.popupChildData;
        this.onDeleteProductAsync();
      }
      else {
        this.productForDelete = undefined;
      }
    });
  }


  fetchProducts() {
    this.loading = true;
    timer(1000)
      .pipe(switchMap(() => this.productService.fetchProductLists()))
      .subscribe({
        next: (response) => {
          this.productData = response.data;
          console.log(this.productData);
          this.loading = false;
        },
      });
  }
  OpenOptions(action: customTableOptionsEmitter) {
    if (action.type === RowOptionsEnum.View) {
      this.ViewProduct(action.data);
    }
    if (action.type === RowOptionsEnum.AddChild) {
      this.AddProductStockPopup(action.data);
    }
    if (action.type === RowOptionsEnum.Delete) {
      this.DeleteProductPopup(action.data);
    }
    if (action.type === RowOptionsEnum.Edit) {
      this.EditProductPopup(action.data);
    }
  }
  AddProductPopup() {
    this.popupService.openComponentPopup(ProductAddEditComponent, {}, 'Add Product Details', 'Save', '70%');
  }
  AddProductStockPopup(selectedProduct: VProduct) {
    this.popupService.openComponentPopup(ProductAddStockComponent, selectedProduct, `Add Stock - ${selectedProduct.productName}`, 'Save', '60%');
  }

  EditProductPopup(selectedProduct: VProduct) {
    this.popupService.openComponentPopup(ProductAddEditComponent, selectedProduct, `Edit - ${selectedProduct.productName}`, 'Save', '70%');
  }

  ViewProduct(selectedProduct: VProduct) {
    this.router.navigate([`/product/${selectedProduct.productCode}`], { state: { productDetails: selectedProduct } });
  }
  DeleteProductPopup(selectedProduct: VProduct) {
    this.popupService.popupState.set({
      showPopup: true,
      popupChildData: selectedProduct,
      popupTitle: 'Confrimation',
      popupMessage: `Are you sure you want to delete this customer - ${selectedProduct.productName} ? This action cannot be undone.`,
      popupFooterType: 'confirm',
      popupWidth: '35%',
    });
  }
  async onDeleteProductAsync() {
    try {
      if (this.productForDelete) {
        const res = await firstValueFrom(this.productService.deleteProduct(this.productForDelete?.productCode));

        if (res.code === 200) {
          this.popupService.popupState.set({
            showPopup: true,
            popupTitle: 'Information',
            popupMessage: `Record for - ${this.productForDelete.productName} deleted successfully`,
            popupFooterType: 'ok',
            popupWidth: '35%',
          });
        } else {
          this.popupService.popupState.set({
            showPopup: true,
            popupTitle: 'Error',
            popupMessage: `unable to delete customer details for - ${this.productForDelete.productName}`,
            popupFooterType: 'ok',
            popupWidth: '35%',
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      this.fetchProducts();
      this.productForDelete = undefined;
    }
  }
}
