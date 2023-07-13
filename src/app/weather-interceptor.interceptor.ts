import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}`,
      setParams: {
        appid: environment.apiKey
      }
    });
    
    return next.handle(modifiedRequest);
  }
}
