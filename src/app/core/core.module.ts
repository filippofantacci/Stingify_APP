import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CryptoInterceptor } from "./interceptor/crypto.interceptor";
import { ErrorHandlerInterceptor } from "./interceptor/errohandler.interceptor";
import { CryptoService } from "./services/crypto.service";
import { ToasterService } from "./services/toaster.service";
import { UserService } from "./services/user.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers:[
    CryptoService,
    ToasterService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CryptoInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ]

})
export class CoreModule { }
