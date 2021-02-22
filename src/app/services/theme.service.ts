import { Injectable } from '@angular/core';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private styleManager: StyleManagerService) {}

  getThemeInStorage(): string {
    if (localStorage.getItem('themeSelected') != undefined) {
      return localStorage.getItem('themeSelected');
    } else {
      localStorage.setItem('themeSelected', 'pink-bluegrey');
      return 'pink-bluegrey';
    }
  }

  setTheme(themeToSet: string) {
    localStorage.removeItem('themeSelected');
    localStorage.setItem('themeSelected', themeToSet);
    this.styleManager.setStyle(
      'theme',
      `./assets/prebuilt-themes/${themeToSet}.css`
    );
  }
}
