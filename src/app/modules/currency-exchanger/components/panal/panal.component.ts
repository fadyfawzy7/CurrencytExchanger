import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rateDetails } from '../../models/currencyConversionParam';
import { CurrencyService } from '../../services/currency.service';
import { Router,NavigationStart, Event as NavigationEvent , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-panal',
  templateUrl: './panal.component.html',
  styleUrls: ['./panal.component.scss']
})
export class PanalComponent implements OnInit {
  constructor(private _currenceyService:CurrencyService , private _ActivatedRoute:ActivatedRoute , private _Router:Router) { }

  
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
  isDetails:boolean = false;
  day = new Date()
  startDate = this.day.getFullYear()-1 + '-' + (this.day.getMonth()+1) + '-' + this.day.getDate()
  endDate = this.day.getFullYear() + '-' + (this.day.getMonth()+1) + '-' + this.day.getDate()
  month:any[] = []
  monthRate:any[] = []
  currencyFrom:string = ''
  currencyTo:string =''
  allSymbolsNames:any

  ngOnInit(): void {
    this._currenceyService.getAllSymbols().subscribe({
      next: (res: any) =>{
        this.availableCurrencies = res
        let allSymbols =Object(this.availableCurrencies.symbols);
        this.allAvailableCurrencies = Object.entries(allSymbols).map(([cc, value]) => ({cc, value}));
        this.allSymbolsNames = allSymbols
      }
    })
    this.defaultCall()
    this.checkURL()
    this.convertForm.get('amount')?.valueChanges.subscribe((data: any)=>{
      this._currenceyService.amountNum.next(data);
     }) 
     

     
  }

  checkURL(){
    
    this._Router.events
    .subscribe(
      (event: NavigationEvent) => {
        if(event instanceof NavigationStart) {
          if(event.url.includes('details'))
          {
          this.isDetails = true
          }
          else{
            this.isDetails = false
          }

        }
      });

  }


// default call
defaultCall(){

  this.amountNum = 1
  this._currenceyService.amountNum.next(1)
  this._currenceyService.getAllCurrencies('EUR').subscribe({
    next:(response)=> {
      this.latestCurrencyConvertContainer = response
      this.toCurrency = this.latestCurrencyConvertContainer.rates[this.convertForm.get('to')?.value]
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
          this.toCurrency = this.latestCurrencyConvertContainer.rates[this.convertForm.get('to')?.value]
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

  // Go home funcion
  goHome(){
    this._Router.navigate(['/popular-currencies'])
  }



getRates(){
  // empty the array for each request
  this.last_day_values_array = []
  this.monthRate = []
  this.month = []
  this.currencyFrom = this.convertForm.get('from')?.value;
  this.currencyTo =  this.convertForm.get('to')?.value;

    let params = {startDate:this.startDate,endDate:this.endDate,base:this.currencyFrom,symbol:this.convertForm.get('to')?.value}
    this._currenceyService.getHistoricalData(params).subscribe({
      next:(response)=> {
        this.historicalRates = response
        this.GetLastDayRatesForAllMonths()
        this._Router.navigate(['/details'])
      }
    })
}

GetLastDayRateInMonth(month:number, year:number) {
  //get access to all the keys, ie: ['2021-11-01', '2021-11-02', ...]
  let rates = this.historicalRates.rates
  const keys = Object.keys(rates);
  let month_string = JSON.stringify(month);

  //add 0 before the month to get 01, 02, ...
  if (month < 10) month_string = `0${month}`;

  //get the relevant keys for the chosen month
  const month_keys = keys.filter((k) =>
      k.includes(`${year}-${month_string}-`)
  );

  // last day in month value
  let  last_day_key:string|undefined =  month_keys.at(-1);
  let  last_day_value = rates[last_day_key as string];
  let  current_currency = Object.keys(last_day_value)[0];
  let  last_day_rate = Object.values(last_day_value)[0];
  const rate_details: rateDetails = {
    date: last_day_key as string,
    value: last_day_rate as number ,

};
  
  return rate_details;
}

GetLastDayRatesForAllMonths() {
    this.dataForChart = []


    let currentYear = new Date().getFullYear();
    //getMonth counts from 0, so january is 0...
    let currentMonth = new Date().getMonth() + 1;

    //add the current month last year
    const months = [{ year: currentYear - 1, month: currentMonth }];

    //then add the rest of the months to this year,
    //this produces 13 months... ie: from 2021-11 to 2022-11
    for (let index = 0; index < 12; index++) {
        if (currentMonth + 1 == 13) {
            currentMonth = 0;
            currentYear += 1;
        }
        months.push({ year: currentYear - 1, month: currentMonth + 1 });
        currentMonth += 1;
    }
    //remove current month if you don't want to calc it's avg...
    months.pop();

    //produce an array of 12 avgs...
    months.map((m) => {
        let value = this.GetLastDayRateInMonth(m.month, m.year);
        this.last_day_values_array.push(value);
    });

    // SAVE ARRAY IN GLOBAL VAR

      this.dataForChart = this.last_day_values_array
      this._currenceyService.ratesArray.next(this.dataForChart)



}



}