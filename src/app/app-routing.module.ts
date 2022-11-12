import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/shared/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MainModule } from './modules/main.module';

const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent,
    loadChildren: () => import('./modules/main-routing.module').then(mod => MainModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
  ,
  {
    path:'**' ,redirectTo:'not-found',pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
