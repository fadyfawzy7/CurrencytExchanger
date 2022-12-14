export interface currencyConversionParams {
  to : string 
  from : string 
  amount : number

}

export interface currencyLatestParams {
  symbols : string 
  base : string 
}

export interface currencyHistoricalDataParams{
  startDate:string
  endDate:string
  base:string
  symbol:string
}

export interface rateDetails{
  date:string;
  value:Number;
}
