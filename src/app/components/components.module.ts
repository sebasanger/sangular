import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SalesChartComponent } from './charts/sales-chart/sales-chart.component';
import { CustomersChartComponent } from './charts/customers-chart/customers-chart.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    SalesChartComponent,
    CustomersChartComponent,
    UploadImageComponent,
  ],
  exports: [SalesChartComponent, CustomersChartComponent],
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ComponentsModule {}
