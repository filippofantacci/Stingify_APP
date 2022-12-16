import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorPagePageRoutingModule } from './error-page-routing.module';

import { ErrorPagePage } from './error-page.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorPagePageRoutingModule,
    TranslateModule
  ],
  declarations: [ErrorPagePage]
})
export class ErrorPagePageModule {}
