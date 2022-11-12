import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './currency-exchanger/components/header/header.component';
import { PanalComponent } from './currency-exchanger/components/panal/panal.component';
import { DetailsComponent } from './currency-exchanger/components/details/details.component';
import { GridComponent } from './currency-exchanger/components/grid/grid.component';
import { MaterialModule } from '../core/material/material.module';
import { SharedModule } from '../core/shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomInterceptor } from '../core/interceptors/custom.Interceptor';
import { CurrencyService } from './currency-exchanger/services/currency.service';
import { CurrencyApiService } from '../core/api/currency-exchanger/currency-api.service';


@NgModule({
  declarations: [
    HeaderComponent,
    PanalComponent,
    DetailsComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    HttpClientModule,

  ],
  providers: [
    CurrencyApiService,   
    CurrencyService,
   {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true},
  ],
})
export class MainModule { }
