import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addHeader(request);
    return next.handle(request);
  }

  private addHeader(request: HttpRequest<any>) {
    request = request.clone({setHeaders: {'apikey': `${environment.apiKey}`}});
    return request;
  }
}
