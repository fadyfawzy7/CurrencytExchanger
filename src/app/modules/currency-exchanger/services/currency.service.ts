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

   getAllCurrencies(baseCurrency:string){
    return this._CurrencyApiService.getAllCurrenciesAPI(baseCurrency)
   }
}
