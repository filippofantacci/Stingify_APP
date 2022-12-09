import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './layout/tab/tab.component';
import { IonicModule } from '@ionic/angular';
import { ThemeChangerComponent } from './components/theme-changer/theme-changer.component';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    TabComponent,
    ThemeChangerComponent,
    ProgressbarComponent,
  ],
  exports: [
    TabComponent,
    ThemeChangerComponent,
    ProgressbarComponent,
  ]
})
export class SharedModule { }
