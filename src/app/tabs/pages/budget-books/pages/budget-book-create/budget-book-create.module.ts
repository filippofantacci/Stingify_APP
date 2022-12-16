import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetBookCreatePageRoutingModule } from './budget-book-create-routing.module';

import { BudgetBookCreatePage } from './budget-book-create.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetBookCreatePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [BudgetBookCreatePage]
})
export class BudgetBookCreatePageModule {}
