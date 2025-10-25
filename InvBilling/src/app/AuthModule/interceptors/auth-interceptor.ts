import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { debounceTime, finalize, Observable } from "rxjs";
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
  //const baseUrl = 'https://192.168.1.5:8002';
  //const baseUrl = 'http://192.168.0.9:8052';

  const cloned = req.url.startsWith('/')
    ? req.clone
      ({ url: baseUrl + req.url, withCredentials: true })
    : req;

  return next(cloned).pipe(
    debounceTime(3000), // delay emissions by 300ms
    finalize(() => loadingService.hide()) // hide loader after debounce or completion
  );
};

