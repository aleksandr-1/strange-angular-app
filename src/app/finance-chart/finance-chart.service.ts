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

  createLineChartData(): Observable<CostDataItem[]> {
    return Observable.of(<CostDataItem[]>[
      { date: '1-May-12', value: 58 },
      { date: '30-Apr-12', value: 53 },
      { date: '27-Apr-12', value: 67 },
      { date: '2-Apr-12', value: 618.63 },
      { date: '30-Mar-12', value: 599.55 },
      { date: '29-Mar-12', value: 609.86 }
    ]);
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
