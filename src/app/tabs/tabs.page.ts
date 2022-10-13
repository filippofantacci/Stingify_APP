import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

  public appTabs = environment.menu.filter(el => {
    // in produzione mostro solo le voci abilitate
    if (environment.production) {
      return el.enabled === true;
    } else {
      return true;
    }
  });
}
