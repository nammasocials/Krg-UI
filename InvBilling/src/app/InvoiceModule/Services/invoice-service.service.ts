import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Vinvoice } from '../Models/Invoice';
import { Constant } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  constructor(private http: HttpClient) {

  }
  fetchInvoiceList(): Observable<ApiResponse<Vinvoice[]>> {
    const url = `/${Constant.apiName}/Invoice/fetchInvoiceList`;
    return this.http.get<ApiResponse<Vinvoice[]>>(url);
  }
  addInvoiceList(): Observable<ApiResponse<Vinvoice>> {
    const url = `/${Constant.apiName}/Invoice/AddInvoice`;
    return this.http.post<ApiResponse<Vinvoice>>(url);
  }
}
