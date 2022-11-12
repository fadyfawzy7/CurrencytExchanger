import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { currencyConversionParams, currencyHistoricalDataParams, currencyLatestParams } from 'src/app/modules/currency-exchanger/models/currencyConversionParam';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
  test:number = 0
  baseUrl = API_URL
  constructor(private _HttpClient:HttpClient) { 
  }

    getConversionAPI(params:currencyConversionParams){
      //
      return this._HttpClient.get(this.baseUrl+`convert?to=${params.to}&from=${params.from}&amount=${params.amount}`)
    }

    getAllCurrenciesAPI(baseCurrency:string){
      //
      return this._HttpClient.get(this.baseUrl+`latest?symbols=&base=${baseCurrency}`)
    }

    getCurrencyHistoricalDataAPI(){
      return this._HttpClient.get(this.baseUrl+`timeseries?start_date=2021-11-09&end_date=2022-11-09&base=USD&symbols=EGP`)
    }

    getAllAvailableCurrenciesFromAPI(){
      //
      return  this._HttpClient.get(this.baseUrl+`symbols`)
    }

}
