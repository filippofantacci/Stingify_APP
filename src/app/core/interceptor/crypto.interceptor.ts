/* eslint-disable */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CryptoService } from '../services/crypto.service';
// import { AccountService } from '../auth/account.service';

@Injectable()
export class CryptoInterceptor implements HttpInterceptor {
  constructor(
    // private accountService: AccountService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.accountService.isSessionValid();
    const enable=environment.cryptRequestResponse.enable;
    const newRequest = enable ? request : this.cryptRequest(request);

    return next.handle(newRequest).pipe(
      map((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          const newResponse = enable ? response : this.decryptResponse(response);
          return newResponse;
        } else {
          return response;
        }
      })
    );
  }

  private cryptRequest(req: HttpRequest<any>): HttpRequest<any> {
    if (req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put') {
      if (req.body instanceof FormData || req.body instanceof Object) {
        if (CryptoService.enableCrypto) {
          req = req.clone({ body: CryptoService.encrypt(req.body) });
        }
      }
    }
    if (req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'delete') {
      const splitted = req.urlWithParams.split('?');
      const url = splitted[0];
      const queryString = splitted.length > 1 ? splitted[1] : null;
      if (queryString) {
        if (CryptoService.enableCrypto) {
          req = req.clone({
            url: url + '?q=' + CryptoService.encrypt(queryString),
          });
        }
      }
    }

    return req;
  }

  private decryptResponse(res: HttpResponse<any>): HttpResponse<any> {
    if (CryptoService.enableCrypto) {
      if (res.status === 200) {
        if (res.body) {
          if (CryptoService.enableCrypto) {
            res = res.clone({
              body: { body: CryptoService.decrypt(res.body) },
            });
          }
        }
      }
    }
    return res;
  }


}
