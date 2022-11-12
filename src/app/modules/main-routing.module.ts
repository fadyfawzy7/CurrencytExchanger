import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './currency-exchanger/components/details/details.component';
import { GridComponent } from './currency-exchanger/components/grid/grid.component';
import { PanalComponent } from './currency-exchanger/components/panal/panal.component';

const routes: Routes = [
  {
    path:'',
    component: PanalComponent , children:[
      {path:'' , redirectTo:'/popular-currencies' , pathMatch:'full' },
      {path:'popular-currencies' , component:GridComponent },
      {path:'details' , component:DetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
