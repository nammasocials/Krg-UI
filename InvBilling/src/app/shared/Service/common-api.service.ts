import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VConstant } from '../Models/commonModels';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/ApiResponse';
import { Constant } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) {

  }
  fetchProductUnitLists(): Observable<ApiResponse<VConstant[]>> {
    const url = `/${Constant.apiName}/Common/getProductUnitType`;
    return this.http.get<ApiResponse<VConstant[]>>(url);
  }
}
