import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetBooksPageRoutingModule } from './budget-books-routing.module';

import { BudgetBooksPage } from './budget-books.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BudgetBooksPageRoutingModule
  ],
  declarations: [BudgetBooksPage]
})
export class BudgetBooksPageModule {}
