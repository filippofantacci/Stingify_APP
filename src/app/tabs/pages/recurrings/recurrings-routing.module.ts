import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecurringsPage } from './recurrings.page';

const routes: Routes = [
  {
    path: '',
    component: RecurringsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurringsPageRoutingModule {}
