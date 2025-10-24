import { Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/Models/ApiResponse';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../constants';
import { VMAuthReq, VMAuthResponse } from '../Models/AuthModels';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  InitiateLogOut(): Observable<ApiResponse<VMAuthResponse>> {
    const url = `/${Constant.apiName}/User/logout`;
    return this.http.get<ApiResponse<VMAuthResponse>>(url);
  }
  InitiateLogIn(request: VMAuthReq): Promise<ApiResponse<VMAuthResponse>> {
    const url = `/${Constant.apiName}/User/Authenticate`;
    return firstValueFrom(this.http.post<ApiResponse<VMAuthResponse>>(url, request));
  }
  isLoggedIn() {
    return this.http.get(`/${Constant.apiName}/User/Validate`, { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

}
