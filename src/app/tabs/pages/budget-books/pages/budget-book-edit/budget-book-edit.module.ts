import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetBookEditPageRoutingModule } from './budget-book-edit-routing.module';

import { BudgetBookEditPage } from './budget-book-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetBookEditPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [BudgetBookEditPage]
})
export class BudgetBookEditPageModule {}
