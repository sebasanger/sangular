import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent implements OnInit {
  private lang: string;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    /*para usar cuando se quiere seleccionar el lenguaje del navegador
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
    */
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.changeLanguague(this.lang);
  }

  changeLanguague(languague: string) {
    localStorage.setItem('lang', languague);
    this.translate.use(languague);
  }
}
