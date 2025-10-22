import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiErrorResponse } from '../../shared/Models/ApiResponse';
import { PopupService } from './../../shared/Service/popup.service'
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const popupService = inject(PopupService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status >= 400 && error.status < 500) {
        popupService.popupState.set({
          showPopup: true,
          popupTitle: '4xx - Client Error Response',
          popupMessage: error.message,
          popupFooterType: 'ok',
          popupWidth: '35%',
        });

      } else if (error.status >= 500) {
        popupService.popupState.set({
          showPopup: true,
          popupTitle: '5xx - Internal Server Error',
          popupMessage: error.message,
          popupFooterType: 'ok',
          popupWidth: '35%',
        });
      }

      return throwError(() => error);
    })
  );
};
