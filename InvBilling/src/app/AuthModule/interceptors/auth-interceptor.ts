import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Bearer your-token`
    }
  });
  return next(cloned);
};

