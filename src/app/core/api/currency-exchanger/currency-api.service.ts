import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { currencyConversionParams} from 'src/app/modules/currency-exchanger/models/currencyConversionParam';
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

    getAllCurrenciesAPI(baseCurrency:string){
      //
      return this._HttpClient.get(this.baseUrl+`latest?symbols=&base=${baseCurrency}`)
    }
}
