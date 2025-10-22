import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../constants';
import { VMAuthReq, VMAuthResponse } from '../Models/AuthModels';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  InitiateLogin(request : VMAuthReq): Promise<ApiResponse<VMAuthResponse>> {
    const url = `/${Constant.apiName}/User/Authenticate`;
    return firstValueFrom(this.http.post<ApiResponse<VMAuthResponse>>(url, request));
  }
  // testLogin(): Observable<string> {
  //   const url = `/${Constant.apiName}/User/Test`;
  //   return this.http.get<string>(url);
  // }
}
