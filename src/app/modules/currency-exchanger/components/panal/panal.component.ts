import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-panal',
  templateUrl: './panal.component.html',
  styleUrls: ['./panal.component.scss']
})
export class PanalComponent implements OnInit {
  // Component Variables
  responseData:any
  constructor(private _currenceyService:CurrencyService) { }

  ngOnInit(): void {

    this._currenceyService.getAllCurrencies('EUR').subscribe({
      next:(response)=> {
        console.log(response);

        this.responseData = response
        console.log(this.responseData);

      }
    })

  }
}