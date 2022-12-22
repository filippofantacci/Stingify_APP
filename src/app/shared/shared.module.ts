import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './layout/tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { ThemeChangerComponent } from './components/theme-changer/theme-changer.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { AmountCardComponent } from './components/cards/amount-card/amount-card.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
  ],
  declarations: [
    TabComponent,
    ThemeChangerComponent,
    ProgressbarComponent,
    AmountCardComponent,
  ],
  exports: [
    TabComponent,
    ThemeChangerComponent,
    ProgressbarComponent,
    AmountCardComponent,
    TranslateModule,
  ]
})
export class SharedModule { }
