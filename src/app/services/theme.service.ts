import { Injectable } from '@angular/core';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private styleManager: StyleManagerService) { }

  setTheme(themeToSet:string) {
    this.styleManager.setStyle(
      "theme",
      `./assets/prebuilt-themes/${themeToSet}.css`,
    );
  }
}
