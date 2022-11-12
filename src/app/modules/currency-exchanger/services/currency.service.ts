import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyApiService } from 'src/app/core/api/currency-exchanger/currency-api.service';
import { currencyConversionParams } from '../models/currencyConversionParam';

@Injectable()

export class CurrencyService {
  monthsArray:BehaviorSubject<[]> = new BehaviorSubject([])
  Grid:BehaviorSubject<{}> = new BehaviorSubject({})
  checkURL:BehaviorSubject<{}> = new BehaviorSubject({})
  amountNum:BehaviorSubject<number> = new BehaviorSubject(0)
  currentCurrency:BehaviorSubject<any> =  new BehaviorSubject(null);
  constructor(private _CurrencyApiService:CurrencyApiService) {

   }
   // Behavior Subject
   getAmount():Observable<any>{
    return this.amountNum.asObservable()
   }
   getGrid():Observable<any>{
    return this.Grid.asObservable()
   }
   getMonthes():Observable<any>{
    return this.monthsArray.asObservable()
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
   getHistoricalData(){
    return this._CurrencyApiService.getCurrencyHistoricalDataAPI()
   }
}
