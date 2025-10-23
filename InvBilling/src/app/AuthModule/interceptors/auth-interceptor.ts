import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { APP_CONFIG } from "../../tokens/app-config.token";
import { LoadingService } from "../../shared/Service/loading-service.service";


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService);
  loadingService.show();

  // const config = inject(APP_CONFIG);
  // const env = config.ApiEnv || 'Default';
  const baseUrl = 'http://localhost:1000';

  const cloned = req.url.startsWith('/')
    ? req.clone
      ({ url: baseUrl + req.url, withCredentials: true })
    : req;

  return next(cloned).pipe(finalize(() => loadingService.hide()));
};

