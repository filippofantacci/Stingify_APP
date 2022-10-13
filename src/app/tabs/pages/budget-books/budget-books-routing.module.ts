import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetBooksPage } from './budget-books.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBooksPageRoutingModule {}
