import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingGoalsPageRoutingModule } from './saving-goals-routing.module';

import { SavingGoalsPage } from './saving-goals.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SavingGoalsPageRoutingModule
  ],
  declarations: [SavingGoalsPage]
})
export class SavingGoalsPageModule {}
