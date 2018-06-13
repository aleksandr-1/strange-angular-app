import {
  Component, OnInit, OnChanges, ViewChild,
  ElementRef, Input, ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';
import { CostDataItem } from '../model/CostDataItem';
import { ChartDataItem } from '../model/ChartDataItem';
import { LineChartConfig } from '../line-chart/line-chart-config-model';
import { LineChartData } from '../line-chart/line-chart-data.model';

@Component({
  selector: 'ff-combined-chart',
  templateUrl: './combined-chart.component.html',
  styleUrls: ['./combined-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CombinedChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') chartContainer: ElementRef;

  @Input() barChartData: CostDataItem[];
  @Input() chartSize: { width, height } = { width: 800, height: 300 };
  @Input() lineChartData: Array<ChartDataItem[]>;
  @Input() chartConfig: LineChartConfig;


  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;


  private parseTime: (dateStr: string) => Date = d3.timeParse('%d/%m/%Y');
  private readonly colorScheme: string[] = d3.schemeCategory20;
  valueLine: any;

  svg: Selection;
  element: any;

  ngOnInit() {
    this.createSVG();

    this.createBarChart();
    if (this.barChartData) {
      this.updateBarChart();
    }

    if (this.lineChartData) {
      this.createLineChart();

    }
  }
  ngOnChanges() {
    if (this.chart) {
      console.log('update chart');
      this.updateBarChart();
    }
  }

  createSVG(): void {
    this.element = this.chartContainer.nativeElement;
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.element).append('svg');
  }

  createBarChart(): void {
    // const element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg
      .attr('width', this.element.offsetWidth)
      .attr('height', this.element.offsetHeight);
    // chart plot area
    this.chart = this.svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.barChartData.map(d => d.date.toString());
    const yDomain = [0, d3.max(this.barChartData, d => d.value)];

    // create scales
    this.xScale = d3.scaleBand()
      .padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear()
      .domain([0, this.barChartData.length])
      .range(<any[]>['blue', 'blue']);

    // x & y axis
    this.xAxis = this.svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis = this.svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateBarChart(): void {
    // update scales & axis
    this.xScale.domain(this.barChartData.map(d => d.date));
    this.yScale.domain([0, d3.max(this.barChartData, d => d.value)]);
    this.colors.domain([0, this.barChartData.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.barChartData);

    // remove exiting bars
    update.exit().remove();

    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d.date))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition().delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => this.height - this.yScale(d.value));
  }


  createLineChart(): void {

    this.xScale = d3.scaleTime().range([0, this.width]);
    this.yScale = d3.scaleLinear().range([this.height, 0]);


    this.svg
      .attr('width', this.element.offsetWidth)
      .attr('height', this.element.offsetHeight)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    let chartDataArr: Array<LineChartData[]> = this.lineChartData
      .map(el => {
        return el.map(d => {
          let item = new LineChartData();
          item.date = this.parseTime(d.date.toString());
          item.value = +d.value;
          return item;
        })
          // sort by date
          .sort((a, b) => a.date.getTime() > b.date.getTime() ? 1 : a.date.getTime() < b.date.getTime() ? -1 : 0);
      });

    console.log('chartDataArr test: ', [].concat(...chartDataArr));
    let flattenedArray = [].concat(...chartDataArr);

    //this.xScale.domain(d3.extent(chartData.map(e => e.date), d => d));
    this.xScale.domain(d3.extent(flattenedArray.map(e => e.date), d => d));

    //this.yScale.domain([0, d3.max(chartData.map(e => e.value), d => d)]);
    this.yScale.domain([0, d3.max(flattenedArray.map(e => e.value), d => d)]);

    this.valueLine = d3.line<LineChartData>()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.value));

    chartDataArr.forEach((data, i) => {
      this.svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('stroke', () => this.colorScheme[i])
        .attr('d', this.valueLine);
    });

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('transform', 'translate(' + this.width + ', 0)')
      .call(d3.axisRight(this.yScale));
  }
}
