import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { apiGetUserAuth } from '../state/auth/auth.actions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private authStore: Store<{ auth: any }>) {}

  ngOnInit(): void {
    this.authStore.dispatch(apiGetUserAuth());
  }
}
