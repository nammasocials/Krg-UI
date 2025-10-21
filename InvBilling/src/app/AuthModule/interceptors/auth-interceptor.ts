import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { APP_CONFIG } from "../../tokens/app-config.token";


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const config = inject(APP_CONFIG);
  const env = config.ApiEnv || 'Default';
  const baseUrl = config.apiDomainUrls?.[env] || '';

  const cloned = req.url.startsWith('/')
    ? req.clone
    ({ url: baseUrl + req.url,  withCredentials: true })
    : req;

  return next(cloned);
};

