import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FinanceChartService } from 'app/finance-chart/finance-chart.service';
import * as d3 from 'd3';
import { type } from 'os';
import { Subject } from 'rxjs/Subject';
import { ItemCost } from 'app/finance-chart/model/ItemCost';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'ff-finance-chart',
    templateUrl: './finance-chart.component.html',
    styleUrls: ['./finance-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FinanceChartComponent implements OnInit {

    barChartObservable: Observable<ItemCost[]>;
    public value: any;

    private barChartData: ItemCost[];

    constructor(private financeChartService: FinanceChartService) { }

    ngOnInit(): void {
        this.financeChartService
            .getData()
            .subscribe(val => {
                this.value = val['value'];
                console.log('val: ', val);
            });

        this.createBarChartData();
    }

    createBarChartData() {
        let barChartData: ItemCost[] = [];

        for (let i = 0; i < 12; i++) {
            let item = new ItemCost();
            item.date = `Month ${i + 1}`;
            item.value = Math.floor(Math.random() * 100);
            barChartData.push(item);
        }
        this.barChartObservable = Observable.of(barChartData);
    }
}
