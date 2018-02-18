import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FinanceChartService } from 'app/finance-chart/finance-chart.service';
import * as d3 from 'd3';
import { type } from 'os';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CostDataItem } from './model/CostDataItem';

@Component({
    selector: 'ff-finance-chart',
    templateUrl: './finance-chart.component.html',
    styleUrls: ['./finance-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FinanceChartComponent implements OnInit {

    barChartObservable: Observable<CostDataItem[]>;
    public value: any;

    barChartData: Observable<CostDataItem[]>;
    lineChartData: Observable<CostDataItem[]>;

    constructor(private financeChartService: FinanceChartService) {
    }

    ngOnInit(): void {
        this.financeChartService
            .getData()
            .subscribe(val => {
                this.value = val['value'];
                console.log('val: ', val);
            });

        this.barChartData = this.financeChartService.createRandomChartData();
        this.lineChartData = this.financeChartService.createLineChartData();
    }
}
