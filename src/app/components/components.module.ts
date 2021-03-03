import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SalesChartComponent } from './charts/sales-chart/sales-chart.component';
import { CustomersChartComponent } from './charts/customers-chart/customers-chart.component';

@NgModule({
  declarations: [SalesChartComponent, CustomersChartComponent],
  exports: [SalesChartComponent, CustomersChartComponent],
  imports: [CommonModule, ChartsModule],
})
export class ComponentsModule {}
