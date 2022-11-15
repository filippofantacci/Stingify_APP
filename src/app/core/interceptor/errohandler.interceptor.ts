import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TOASTER_TYPE } from 'src/app/utils/app-constants';
import { ToastOptions } from '@ionic/core';
import { ToasterService } from '../services/toaster.service';
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private toaster: ToasterService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(null, (error: HttpErrorResponse) => {
        // errore
        if (req.url && error.status >= 500) {
          let msg = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = `Error: ${error.error.message}`;
            let opts: ToastOptions = {
              header: '',
              message: msg,
              // duration: 2000,
              color: 'danger',
              buttons: [{
                icon: 'close',
                role: 'cancel'
              }
              ]
            }
            this.toaster.presentToastWithOptions(opts);
          } else {
            // server-side error
            msg = `Error Status: ${error.status}\nMessage: ${error.message}`;

            let opts: ToastOptions = {
              header: '',
              message: TOASTER_TYPE.ERROR,
              // duration: 2000,
              color: 'danger',
              buttons: [{
                icon: 'close',
                role: 'cancel'
              }
              ]
            }
            this.toaster.presentToastWithOptions(opts);
          }
        }
        if (req.url && error.status >= 400) {
          let msg = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = `Error: ${error.error.message}`;
            let opts: ToastOptions = {
              header: '',
              message: msg,
              // duration: 2000,
              color: 'danger',
              buttons: [{
                icon: 'close',
                role: 'cancel'
              }
              ]
            }
            this.toaster.presentToastWithOptions(opts);
          } else {
            // server-side error
            msg = `Error Status: ${error.status}\nMessage: ${error.message}`;

            let opts: ToastOptions = {
              header: '',
              message: TOASTER_TYPE.ERROR,
              // duration: 2000,
              color: 'danger',
              buttons: [{
                icon: 'close',
                role: 'cancel'
              }
              ]
            }
            this.toaster.presentToastWithOptions(opts);
          }
        }
      })
    );
  }
}
