import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FinanceChartComponent } from 'app/finance-chart/finance-chart.component';
import { FinanceChartService } from 'app/finance-chart/finance-chart.service';
import { BarChartComponent } from 'app/finance-chart/bar-chart/bar-chart.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FinanceChartComponent,
        BarChartComponent
    ],
    providers: [
        FinanceChartService
    ]
})
export class FinanceChartModule {
}
