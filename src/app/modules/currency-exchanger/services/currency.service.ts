import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CurrencyApiService } from 'src/app/core/api/currency-exchanger/currency-api.service';
import { currencyConversionParams, currencyHistoricalDataParams } from '../models/currencyConversionParam';

@Injectable()

export class CurrencyService {

  Grid:BehaviorSubject<{}> = new BehaviorSubject({})
  amountNum:BehaviorSubject<number> = new BehaviorSubject(0)
  currentCurrency:BehaviorSubject<any> =  new BehaviorSubject(null);
  ratesArray:BehaviorSubject<[]> = new BehaviorSubject([])
  MonthesValuesArray:BehaviorSubject<[]> = new BehaviorSubject([])
  constructor(private _CurrencyApiService:CurrencyApiService) {
   }

   
   // Behavior Subject
   getAmount():Observable<any>{
    return this.amountNum.asObservable()
   }
   getGrid():Observable<any>{
    return this.Grid.asObservable()
   }
   getMonthesValues():Observable<any>{
    return this.MonthesValuesArray.asObservable()
   }
   getRatesArray():Observable<any>{
    return this.ratesArray.asObservable()
   }

   // Api Calling Functions
   getAllSymbols(){
    return this._CurrencyApiService.getAllAvailableCurrenciesFromAPI();
   }
   getConversion(parms: currencyConversionParams){
    return this._CurrencyApiService.getConversionAPI(parms);
   }
   getAllCurrencies(baseCurrency:string){
    return this._CurrencyApiService.getAllCurrenciesAPI(baseCurrency)
   }
   getHistoricalData(params:currencyHistoricalDataParams){
    return this._CurrencyApiService.getCurrencyHistoricalDataAPI(params)
   }
}
