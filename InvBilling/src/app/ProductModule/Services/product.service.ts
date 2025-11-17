import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Constant } from '../../constants';
import { VProduct, VProductAddStock } from '../Models/VProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  fetchProductLists(): Observable<ApiResponse<VProduct[]>> {
    const url = `/${Constant.apiName}/Product/getAllProductList`;
    return this.http.get<ApiResponse<VProduct[]>>(url);
  }
  fetchProductImage(productCode: string): Observable<string> {
    return this.http
      .get(`/${Constant.apiName}/Product/getProductPhoto/${productCode}`, { responseType: 'blob' })
      .pipe(map(blob => URL.createObjectURL(blob)));
  }
  fetchProductDetails(productCode: string): Observable<ApiResponse<VProduct>> {
    const url = `/${Constant.apiName}/Product/getProductDetails/${productCode}`;
    return this.http.get<ApiResponse<VProduct>>(url);
  }
  addProduct(product: FormData): Observable<ApiResponse<VProduct>> {
    const url = `/${Constant.apiName}/Product/AddProduct`;
    return this.http.post<ApiResponse<VProduct>>(url, product);
  }
  addStock(product: FormData): Observable<ApiResponse<VProductAddStock>> {
    const url = `/${Constant.apiName}/Product/AddStockEntry`;
    return this.http.post<ApiResponse<VProductAddStock>>(url, product);
  }
  editProduct(product: FormData): Observable<ApiResponse<VProduct>> {
    const url = `/${Constant.apiName}/Product/EditProduct`;
    return this.http.post<ApiResponse<VProduct>>(url, product);
  }
  deleteProduct(productCode: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `/${Constant.apiName}/Product/DeleteProduct/${productCode}`
    );
  }
}
