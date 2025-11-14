import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { VMAuthResponse } from '../../AuthModule/Models/AuthModels';
import { Constant } from '../../constants';
import { VCustomer } from '../Models/VCustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {

  }
  fetchCustomerLists(): Observable<ApiResponse<VCustomer[]>> {
    const url = `/${Constant.apiName}/Customer/getAllCustomerList`;
    return this.http.get<ApiResponse<VCustomer[]>>(url);
  }
  fetchRecentlyAddedCustomers(): Observable<ApiResponse<VCustomer[]>> {
    const url = `/${Constant.apiName}/Customer/getRecentlyAddedCustomers`;
    return this.http.get<ApiResponse<VCustomer[]>>(url);
  }
  
  addCustomer(customer: FormData): Observable<ApiResponse<VCustomer>> {
    const url = `/${Constant.apiName}/Customer/AddCustomer`;
    return this.http.post<ApiResponse<VCustomer>>(url, customer);
  }
  editCustomer(customer: FormData): Observable<ApiResponse<VCustomer>> {
    const url = `/${Constant.apiName}/Customer/EditCustomer`;
    return this.http.post<ApiResponse<VCustomer>>(url, customer);
  }
  fetchCustomerImage(customerCode: string): Observable<string> {
    return this.http
      .get(`/${Constant.apiName}/Customer/getCustomerPhoto/${customerCode}`, { responseType: 'blob' })
      .pipe(map(blob => URL.createObjectURL(blob)));
  }
  fetchCustomerDetails(customerCode: string): Observable<ApiResponse<VCustomer>> {
    const url = `/${Constant.apiName}/Customer/getCustomerDetails/${customerCode}`;
    return this.http.get<ApiResponse<VCustomer>>(url);
  }
  deleteCustomer(customerCode: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `/${Constant.apiName}/Customer/DeleteCustomer/${customerCode}`
    );
  }

}
