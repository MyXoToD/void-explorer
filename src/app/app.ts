import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Sidebar } from './layout/sidebar/sidebar';

@Component({
  selector: 've-root',
  imports: [RouterOutlet, Sidebar, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private _translate = inject(TranslateService);
  library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faHouse);
    this._translate.addLangs(['en', 'de', 'jp']);
    this._translate.setFallbackLang('en');
    this._translate.use('en');
  }
}
