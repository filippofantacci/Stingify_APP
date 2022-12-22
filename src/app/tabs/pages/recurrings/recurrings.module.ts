import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecurringsPageRoutingModule } from './recurrings-routing.module';

import { RecurringsPage } from './recurrings.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRecurringAmountModalComponent } from './add-recurring-amount-modal/add-recurring-amount-modal.component';
import { EditRecurringAmountModalComponent } from './edit-recurring-amount-modal/edit-recurring-amount-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecurringsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecurringsPage, 
    AddRecurringAmountModalComponent, 
    EditRecurringAmountModalComponent
  ]
})
export class RecurringsPageModule { }
