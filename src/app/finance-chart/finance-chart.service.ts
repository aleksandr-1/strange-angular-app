import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CostDataItem } from './model/CostDataItem';
import 'rxjs/add/observable/of';

@Injectable()
export class FinanceChartService {

  constructor(
    private http: HttpClient) { }

  getData() {
    return this.http.get('/assets/data.json');
  }

  createLineChartData(): Observable<CostDataItem[][]> {
    return Observable.of([<CostDataItem[]>[
      { date: '04/01/2018', value: 2197 },
      { date: '20/01/2018', value: 1620 },
      { date: '07/02/2018', value: 1925.70 },
      { date: '20/02/2018', value: 1620 },
      { date: '07/03/2018', value: 2113.92 },
      { date: '20/03/2018', value: 1620 }
    ],
    <CostDataItem[]>[
      { date: '04/01/2018', value: 1500 },
      { date: '20/01/2018', value: 1200 },
    ]]);
  }

  createRandomChartData(): Observable<CostDataItem[]> {
    let barChartData: CostDataItem[] = [];
    for (let i = 0; i < 12; i++) {
      let item = new CostDataItem();
      item.date = `Month ${i + 1}`;
      item.value = Math.floor(Math.random() * 100);
      barChartData.push(item);
    }
    return Observable.of(barChartData);
  }
}
