import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { Vinvoice, VinvoiceDetail } from '../Models/Invoice';
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
  fetchInvoiceDetails(invoiceId: string): Observable<ApiResponse<VinvoiceDetail>> {
    const url = `/${Constant.apiName}/Invoice/fetchInvoiceDetails/${invoiceId}`;
    return this.http.get<ApiResponse<VinvoiceDetail>>(url);
  }
  addInvoice(invoice: FormData): Observable<ApiResponse<Vinvoice>> {
    const url = `/${Constant.apiName}/Invoice/AddInvoice`;
    return this.http.post<ApiResponse<Vinvoice>>(url, invoice);
  }
  fetchEwayBillImage(invoiceCode: string): Observable<string> {
    return this.http
      .get(`/${Constant.apiName}/Invoice/getEwayBillPhoto/${invoiceCode}`, { responseType: 'blob' })
      .pipe(map(blob => URL.createObjectURL(blob)));
  }
  /**
   * Fetches the RDLC-rendered invoice PDF. The response is observed in full so the
   * filename the API sets in Content-Disposition can be reused for the download.
   */
  downloadInvoicePdf(invoiceCode: string): Observable<HttpResponse<Blob>> {
    const url = `/${Constant.apiName}/Invoice/exportInvoicePdf/${invoiceCode}`;
    return this.http.get(url, { responseType: 'blob', observe: 'response' });
  }
}
