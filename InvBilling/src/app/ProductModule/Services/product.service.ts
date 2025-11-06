import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Constant } from '../../constants';
import { VProduct } from '../Models/VProduct';

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
  addProduct(product: FormData): Observable<ApiResponse<VProduct>> {
    const url = `/${Constant.apiName}/Product/AddProduct`;
    return this.http.post<ApiResponse<VProduct>>(url, product);
  }
  editProduct(product: FormData): Observable<ApiResponse<VProduct>> {
    const url = `/${Constant.apiName}/Product/EditProduct`;
    return this.http.post<ApiResponse<VProduct>>(url, product);
  }
  deleteProduct(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `/${Constant.apiName}/Product/DeleteProduct/${id}`
    );
  }
}
