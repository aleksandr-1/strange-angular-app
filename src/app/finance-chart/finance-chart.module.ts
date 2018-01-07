import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FinanceChartComponent } from 'app/finance-chart/finance-chart.component';
import { FinanceChartService } from 'app/finance-chart/finance-chart.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FinanceChartComponent
    ],
    providers: [
        FinanceChartService
    ]
})
export class FinanceChartModule {
}
