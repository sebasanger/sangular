import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Nopage404Component } from './nopage404/nopage404.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [NavigationComponent, Nopage404Component, ThemePickerComponent],
  exports: [NavigationComponent, Nopage404Component,ThemePickerComponent],
  imports: [
    RouterModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
})
export class SharedModule {}
