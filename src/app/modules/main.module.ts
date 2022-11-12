import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './currency-exchanger/components/header/header.component';
import { PanalComponent } from './currency-exchanger/components/panal/panal.component';
import { DetailsComponent } from './currency-exchanger/components/details/details.component';
import { GridComponent } from './currency-exchanger/components/grid/grid.component';
import { MaterialModule } from '../core/material/material.module';
import { SharedModule } from '../core/shared/shared.module';


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
    SharedModule
  ]
})
export class MainModule { }
