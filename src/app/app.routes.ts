import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { FinanceChartComponent } from 'app/finance-chart/finance-chart.component';
import { HomePageComponent } from 'app/home/home-page.component';

export const ROUTES: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'finance-chart', component: FinanceChartComponent },
  { path: '**', component: NoContentComponent },
];
