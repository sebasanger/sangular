import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from 'src/app/interfaces/ui/theme-options';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
  options: ThemeOptions[];

  themeSelected: string;

  constructor(private themeService: ThemeService) {
    this.options = [
      {
        backgroundColor: '#fff',
        buttonColor: '#ffc107',
        headingColor: '#673ab7',
        label: 'Deep Purple & Amber',
        value: 'deeppurple-amber',
      },
      {
        backgroundColor: '#fff',
        buttonColor: '#ff4081',
        headingColor: '#3f51b5',
        label: 'Indigo & Pink',
        value: 'indigo-pink',
      },
      {
        backgroundColor: '#303030',
        buttonColor: '#607d8b',
        headingColor: '#e91e63',
        label: 'Pink & Blue Grey',
        value: 'pink-bluegrey',
      },
      {
        backgroundColor: '#303030',
        buttonColor: '#4caf50',
        headingColor: '#9c27b0',
        label: 'Purple & Green',
        value: 'purple-green',
      },
    ];
  }

  ngOnInit(): void {
    this.themeSelected = this.themeService.getThemeInStorage();
    this.changeTheme(this.themeSelected);
  }

  changeTheme(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}
