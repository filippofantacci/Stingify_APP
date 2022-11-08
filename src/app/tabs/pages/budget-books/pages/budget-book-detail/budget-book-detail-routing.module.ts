import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetBookDetailPage } from './budget-book-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBookDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBookDetailPageRoutingModule {}
