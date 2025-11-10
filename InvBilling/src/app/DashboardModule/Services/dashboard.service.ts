import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { VDashboardStats } from '../Models/CustomerModels';
import { Constant } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {

  }
  fetchCustomerDashboardStats(): Observable<ApiResponse<VDashboardStats>> {
    const url = `/${Constant.apiName}/Customer/getCustomerStats`;
    return this.http.get<ApiResponse<VDashboardStats>>(url);
  }
  getCutomerPercentage(totalCustomer: number, currentCustomer: number) {

    if (!totalCustomer || totalCustomer === 0) {
      return 0; // Avoid division by zero
    }
    return (currentCustomer / totalCustomer) * 100

  }
}
