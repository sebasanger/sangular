import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SalesChartComponent } from './charts/sales-chart/sales-chart.component';
import { CustomersChartComponent } from './charts/customers-chart/customers-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [SalesChartComponent, CustomersChartComponent],
  exports: [SalesChartComponent, CustomersChartComponent],
  imports: [CommonModule, ChartsModule, MatCardModule, MatGridListModule],
})
export class ComponentsModule {}
