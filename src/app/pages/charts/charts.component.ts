import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) {}
  public rows: number;
  public cols: number;
  ngOnInit(): void {}

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cols = 2;
        this.rows = 2;
      } else {
        this.cols = 1;
        this.rows = 1;
      }
    })
  );
}
