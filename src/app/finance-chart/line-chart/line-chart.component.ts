import { Component, ElementRef, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CostDataItem } from '../model/CostDataItem';
import { LineChartData } from './line-chart-data.model';
import { LineChartConfig } from './line-chart-config-model';
import { ChartDataItem } from '../model/ChartDataItem';

@Component({
    selector: 'ff-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
    @Input() chartData: Array<ChartDataItem[]>;
    @Input() chartConfig: LineChartConfig;
    @ViewChild('lineChart') private chartContainer: ElementRef;

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };

    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;

    private offsetWidth: number = 960;
    private offsetHeight: number = 500;

    private valueLine: any;

    private parseTime: (dateStr: string) => Date = d3.timeParse('%d/%m/%Y');

    private readonly colorScheme: string[] = d3.schemeCategory20;

    ngOnInit(): void {
        this.createChart();
    }

    createChart(): void {
        const element = this.chartContainer.nativeElement;
        this.width = this.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.offsetHeight - this.margin.top - this.margin.bottom;

        this.xScale = d3.scaleTime().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);


        const svg = d3.select(element)
            .append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        let chartDataArr: Array<LineChartData[]> = this.chartData
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
            svg.append('path')
                .data([data])
                .attr('class', 'line')
                .attr('stroke', () => this.colorScheme[i])
                .attr('d', this.valueLine);
        });

        svg.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.xScale));

        svg.append('g')
            .call(d3.axisLeft(this.yScale));
    }
}
