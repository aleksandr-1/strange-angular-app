import { Component, ElementRef, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CostDataItem } from '../model/CostDataItem';

@Component({
    selector: 'ff-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
    @ViewChild('lineChart') private chartContainer: ElementRef;
    @Input() private chartData: CostDataItem[];

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };

    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;

    private offsetWidth: number = 960;
    private offsetHeight: number = 500;

    private valueLine: any;

    private parseTime: (dateStr: string) => Date = d3.timeParse('%d-%b-%y');

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

        let data: any[] = [
            { date: '1-May-12', close: 58 },
            { date: '30-Apr-12', close: 53 },
            { date: '27-Apr-12', close: 67 },
            { date: '2-Apr-12', close: 618.63 },
            { date: '30-Mar-12', close: 599.55 },
            { date: '29-Mar-12', close: 609.86 }
        ];

        let chartData: LineChartData[] = data.map(d => {
            let item = new LineChartData();
            item.date = this.parseTime(d.date);
            item.value = +d.close;
            return item;
        });

        console.log('chartData: ', chartData);

        this.xScale.domain(d3.extent(chartData.map(e => e.date), d => d));
        this.yScale.domain([0, d3.max(chartData.map(e => e.value), d => d)]);

        this.valueLine = d3.line<LineChartData>()
            .x(d => this.xScale(d.date))
            .y(d => this.yScale(d.value));

        svg.append('path')
            .data([chartData])
            .attr('class', 'line')
            .attr('d', this.valueLine);

        svg.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(this.xScale));

        svg.append('g')
            .call(d3.axisLeft(this.yScale));
    }
}

export class LineChartData {
    date: Date;
    value: number;
}
