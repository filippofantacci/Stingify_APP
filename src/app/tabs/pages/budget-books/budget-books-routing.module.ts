import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetBooksPage } from './budget-books.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetBooksPage,

  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/budget-book-detail/budget-book-detail.module').then( m => m.BudgetBookDetailPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/budget-book-create/budget-book-create.module').then( m => m.BudgetBookCreatePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/budget-book-edit/budget-book-edit.module').then( m => m.BudgetBookEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetBooksPageRoutingModule {}
