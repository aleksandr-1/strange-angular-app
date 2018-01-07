import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FinanceChartService {

  constructor(
    public http: HttpClient
  ) { }

  public getData() {
    return this.http.get('/assets/data.json');
  }
}
