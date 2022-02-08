import {
  HttpInterceptor as HttpInterceptorModel,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {NotificationService} from '../services/notification.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptorModel {

  constructor(private notification: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let newRequest: HttpRequest<any>;
    const requestUrl = request.url.replace(/\/$/, '');

    newRequest = request.clone({
      url: requestUrl,
      method: request.method,
      headers: request.headers
        .set('Content-Type', `application/vnd.example.v1+json`)
        .set('Accept', `application/json`)
    });

    return next.handle(newRequest).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && !event?.body) {
            return;
          }
          if (event instanceof HttpResponse
            && ['POST', 'PUT', 'DELETE', 'GET'].indexOf(newRequest.method) > -1
            && event.body.message
            && event.body.status) {
            this.notification.success(event.body.message);
          }
        },
        async (error: HttpErrorResponse) => {
          if (error.hasOwnProperty('errors') &&
            error.error.hasOwnProperty('message') &&
            error.error.message) {
            this.notification.error(error.error.message);
          } else if (error.hasOwnProperty('error') &&
            error.error.hasOwnProperty('message') &&
            error.error.message) {
            this.notification.error(error.error.message);
          }
        }, () => {
        }
      )
    );
  }
}
