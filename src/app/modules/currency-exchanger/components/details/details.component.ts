import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  // variables
  chartOption!: EChartsOption;

  constructor() { }

  ngOnInit(): void {

    this.chartOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          color: '#e91e63',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(233, 30, 180, 0.1)'
          }
        }
      ]
    };
  }

}
