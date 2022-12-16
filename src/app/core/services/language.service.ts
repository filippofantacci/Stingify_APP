import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = '';

  constructor(
    private translate: TranslateService,
    ) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.selected = language;

  }

  getLanguages() {
    return [
      { text:'English', value: 'en'},
      { text:'Italiano', value: 'it'}
    ]
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
  }
}
