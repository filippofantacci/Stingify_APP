import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteAccessGuard } from '../core/auth/guard/route-access.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'budget-books',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'budget-books',
        pathMatch: 'full'
      },
      {
        path: 'budget-books',
        data : {
          url: 'budget-books'
        },
        canActivate: [RouteAccessGuard],
        // esempio: authorities: [RuolesEnum.USERS],
        loadChildren: () => import('./pages/budget-books/budget-books.module').then( m => m.BudgetBooksPageModule)
      },
      {
        path: 'saving-goals',
        data : {
          url: 'saving-goals'
        },
        canActivate: [RouteAccessGuard],
        loadChildren: () => import('./pages/saving-goals/saving-goals.module').then( m => m.SavingGoalsPageModule)
      },
      {
        path: 'reports',
        data : {
          url: 'reports'
        },
        canActivate: [RouteAccessGuard],
        loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: 'categories',
        data : {
          url: 'categories'
        },
        canActivate: [RouteAccessGuard],
        loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
