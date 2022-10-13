import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'budget-books',
        loadChildren: () => import('./pages/budget-books/budget-books.module').then( m => m.BudgetBooksPageModule)
      },
      {
        path: 'saving-goals',
        loadChildren: () => import('./pages/saving-goals/saving-goals.module').then( m => m.SavingGoalsPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/budget-books',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/budget-books',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
