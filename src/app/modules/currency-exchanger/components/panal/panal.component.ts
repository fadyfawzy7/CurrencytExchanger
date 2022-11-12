import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { rateDetails } from '../../models/currencyConversionParam';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-panal',
  templateUrl: './panal.component.html',
  styleUrls: ['./panal.component.scss']
})
export class PanalComponent implements OnInit {
  constructor(private _currenceyService:CurrencyService , private _Router:Router) { }


    // Reactive Form
  convertForm:FormGroup= new FormGroup({
    to:new FormControl ('USD' , [Validators.required]),
    from: new FormControl ('EUR', [Validators.required]),
    amount: new FormControl (1, [Validators.required]),
  })



  // Component Variables
  latestCurrencyConvertContainer:any;
  availableCurrencies:any
  allAvailableCurrencies:any[]=[]
  messageError:string=''
  historicalRates:any
  dataForChart:any
  last_day_values_array:any[]=[]
  toCurrency!:number
  amountNum!:number;






  ngOnInit(): void {
    this._currenceyService.getAllSymbols().subscribe({
      next: (res: any) =>{
        this.availableCurrencies = res
        let allSymbols =Object(this.availableCurrencies.symbols);
        this.allAvailableCurrencies = Object.entries(allSymbols).map(([cc, value]) => ({cc, value}));
        
      }
    })

    this.defaultCall()

  }


// default call
defaultCall(){

  this.amountNum = 1
  this._currenceyService.amountNum.next(1)
  this._currenceyService.getAllCurrencies('EUR').subscribe({
    next:(response)=> {
      this.latestCurrencyConvertContainer = response
      console.log(this.latestCurrencyConvertContainer)
      this.toCurrency = this.latestCurrencyConvertContainer.rates[this.convertForm.get('to')?.value]
      console.log(this.toCurrency);
      JSON.stringify(localStorage.setItem('currency', this.convertForm.get('to')?.value))
      this._Router.navigate(['/popular-currencies'])
      this._currenceyService.Grid.next(this.latestCurrencyConvertContainer);  
      
    }
  })
}








  // Convert function to call 
  onConvert(convertForm:FormGroup){
    if(convertForm.valid)
    {
      this.amountNum = this.convertForm.get('amount')?.value
      this._currenceyService.amountNum.next(this.convertForm.get('amount')?.value);
      this._currenceyService.getAllCurrencies(this.convertForm.get('from')?.value).subscribe({
        next:(response)=> {
          this.latestCurrencyConvertContainer = response
          console.log(this.latestCurrencyConvertContainer)
          this.toCurrency = this.latestCurrencyConvertContainer.rates[this.convertForm.get('to')?.value]
          console.log(this.toCurrency);
          JSON.stringify(localStorage.setItem('currency', this.convertForm.get('to')?.value))
          this._Router.navigate(['/popular-currencies'])
          this._currenceyService.Grid.next(this.latestCurrencyConvertContainer);
         
        }
      })
    }
    else{
      this.messageError = "Please complete inputs"
    }
  }


// Switch between 2 inputs ( from and to)
  switch(){
    let fromValu = this.convertForm.get('from')?.value;
    let toValu = this.convertForm.get('to')?.value;
    this.convertForm.controls['from'].setValue(toValu);
    this.convertForm.controls['to'].setValue(fromValu);
  }






}