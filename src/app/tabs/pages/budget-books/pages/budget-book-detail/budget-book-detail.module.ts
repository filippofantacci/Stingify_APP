import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetBookDetailPageRoutingModule } from './budget-book-detail-routing.module';

import { BudgetBookDetailPage } from './budget-book-detail.page';
import { AddAmountModalComponent } from './add-amount-modal/add-amount-modal.component';
import { EditAmountModalComponent } from './edit-amount-modal/edit-amount-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetBookDetailPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BudgetBookDetailPage,
    AddAmountModalComponent,
    EditAmountModalComponent,
  ]
})
export class BudgetBookDetailPageModule {}
