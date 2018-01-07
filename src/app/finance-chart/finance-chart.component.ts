import {
    Component,
    OnInit
} from '@angular/core';
import { FinanceChartService } from 'app/finance-chart/finance-chart.service';

@Component({
    selector: 'finance-chart',
    templateUrl: './finance-chart.component.html',
    styleUrls: ['./finance-chart.component.scss']
})
export class FinanceChartComponent implements OnInit {

    public value: any;
    constructor(private financeChartService: FinanceChartService) { }

    public ngOnInit(): void {
        this.financeChartService
        .getData()
        .subscribe(val => {
            this.value = val['value'];
            console.log('val: ', val);
        });
    }
}
