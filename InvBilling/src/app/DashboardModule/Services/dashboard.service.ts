import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { VDashboardStats } from '../Models/CustomerModels';
import { Constant } from '../../constants';
import { VactivityLog } from '../Models/ActivityLog';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {

  }
  fetchRecentActivityLogs(): Observable<ApiResponse<VactivityLog[]>> {
    const url = `/${Constant.apiName}/ActivityLog/getRecentActivityLogs`;
    return this.http.get<ApiResponse<VactivityLog[]>>(url);
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
