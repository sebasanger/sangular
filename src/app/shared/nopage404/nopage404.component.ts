import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopage404',
  templateUrl: './nopage404.component.html',
  styleUrls: ['./nopage404.component.scss'],
})
export class Nopage404Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public year = new Date().getFullYear();

  goHome() {
    this.router.navigateByUrl('/');
  }
}
