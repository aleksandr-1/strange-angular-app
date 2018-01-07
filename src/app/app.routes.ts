import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { FinanceChartComponent } from 'app/finance-chart/finance-chart.component';

export const ROUTES: Routes = [
  { path: '',      component: FinanceChartComponent },
  { path: 'finance-chart', component: FinanceChartComponent },
  { path: '**',    component: NoContentComponent },
];
