import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SessionService } from '../services/session.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  @BlockUI() blockUI: NgBlockUI;
  constructor(private sessionService: SessionService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token') ;
    console.log('token', token);
    const currentUser = this.sessionService.currentUserValue;
    console.log('currentUser', currentUser);
    // if (token) {
    //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }

    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${currentUser.token}`
            }
        });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    this.blockUI.start(); // Start blocking
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              this.blockUI.stop(); // Stop blocking
              // this.errorDialogService.openDialog(event);
              // if (!event.body.isSuccess) {
              //     alert(event.body.errorHolder.friendlyMessage);
              // }
          }
          return event;
      }),
      catchError((error: HttpErrorResponse) => {

          // data = {
          //     reason: error && error.error.message ? error.error.message : 'Something went wrong, please try again later',
          //     status: error.status
          // };
          // this.errorDialogService.openDialog(data);
          this.blockUI.stop(); // Stop blocking
          if (error.status === 401) {
              // auto logout if 401 response returned from api
              this.sessionService.logout();
              location.reload(true);
          }
          // alert(error.error.message);
          return throwError(error);
      }));
  }
}
