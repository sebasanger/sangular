import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-component-page-header',
  templateUrl: './component-page-header.component.html',
  styleUrls: ['./component-page-header.component.scss'],
})
export class ComponentPageHeaderComponent implements OnInit {
  public title: string;
  constructor(private menuStore: Store<{ menu: any }>) {}

  ngOnInit(): void {
    this.menuStore.select('menu').subscribe((res) => {
      this.title = res.title;
    });
  }
}
