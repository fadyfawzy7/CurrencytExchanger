import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit , OnDestroy {
  Subscription!:Subscription
  response:any
  resp:any[] = []
  constructor(private _Route:ActivatedRoute , private _CurrencyService:CurrencyService) { }
  responseDataFromHome:any
  numAmount:any
  ngOnInit( ): void {
    
    this._CurrencyService.getAmount().subscribe({
      next:num => {
        this.numAmount = num
      }
    })

    
    this.Subscription = this._CurrencyService.getGrid().subscribe({
      next: res => {

        this.resp.push(res.rates)
        
        const object = res.rates;
  
        let allRates =Object(res.rates);

        function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
          const ret: any = {};
          keys.forEach(key => {
            ret[key] = obj[key];
          })
          return ret;
        }

        const picked = pick(allRates, 'USD', 'EUR','JPY','GBP','AUD','CAD','CHF','CNY','NZD');

        console.log(picked);
        this.resp = Object.entries(picked).map(([cc, value]) => ({cc, value}));
        
      }
    })
   
    
  }
  ngOnDestroy(){
    this.Subscription.unsubscribe()
  }

}
