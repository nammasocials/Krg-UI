import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
