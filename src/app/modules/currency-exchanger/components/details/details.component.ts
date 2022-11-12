import { Component, OnInit } from '@angular/core';
import { EChartsOption, number } from 'echarts';
import { CurrencyService } from '../../services/currency.service';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  // variables
  unsubscribe!: Subscription
  monthesChart:any[]=[]
  month:any[]=[]
  monthRate:any[]=[]
  chartOption!: EChartsOption;
  monthsFromSuject:any = []
  monthsValuesFromSuject:any = []


  constructor(private _currenceyService:CurrencyService) { }

  ngOnInit(): void {

     // Get Rates for historical dates
     this.unsubscribe = this._currenceyService.getRatesArray().subscribe({
      next: res => {
        this.month = []
        this.monthRate = []

        this.monthesChart = res
        this.monthesChart.filter( rate => {

        this.month.push(moment(rate.date).format('MMM:YYYY'))

        this.monthRate.push(rate.value)

        })


        this.chartOption = {
          xAxis: {
            type: 'category',
            data: this.month
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.monthRate,
              type: 'line',
              color: '#e91e63'
            }
          ]
        };


      }

   })
  }











}


