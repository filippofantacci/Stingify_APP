import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetBookCreatePage } from './budget-book-create.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBookCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBookCreatePageRoutingModule {}
