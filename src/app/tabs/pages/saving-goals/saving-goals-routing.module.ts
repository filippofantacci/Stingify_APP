import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavingGoalsPage } from './saving-goals.page';

const routes: Routes = [
  {
    path: '',
    component: SavingGoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingGoalsPageRoutingModule {}
