import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecurringsPageRoutingModule } from './recurrings-routing.module';

import { RecurringsPage } from './recurrings.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecurringsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RecurringsPage]
})
export class RecurringsPageModule { }
