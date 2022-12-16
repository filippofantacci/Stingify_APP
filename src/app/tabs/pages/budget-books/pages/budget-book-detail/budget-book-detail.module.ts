import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAmountModalComponent } from './add-amount-modal/add-amount-modal.component';
import { BudgetBookDetailPageRoutingModule } from './budget-book-detail-routing.module';
import { BudgetBookDetailPage } from './budget-book-detail.page';
import { EditAmountModalComponent } from './edit-amount-modal/edit-amount-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetBookDetailPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    BudgetBookDetailPage,
    AddAmountModalComponent,
    EditAmountModalComponent,
  ]
})
export class BudgetBookDetailPageModule {}
