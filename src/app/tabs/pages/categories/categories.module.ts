import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateCategoryModalComponent } from './modals/create-category-modal/create-category-modal.component';
import { EditCategoryModalComponent } from './modals/edit-category-modal/edit-category-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriesPage,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
  ]
})
export class CategoriesPageModule {}
