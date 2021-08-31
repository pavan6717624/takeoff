import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../user/home/home.component';
import { TakeoffComponent } from './takeoff/takeoff.component';
import { ComplimentaryComponent } from './complimentary/complimentary.component';
import { FreeComponent } from './free/free.component';
import { DailyComponent } from './daily/daily.component';

const routes: Routes = [

     { path: '',  component: HomeComponent,
    
    
     children: [
      { path: '', component: TakeoffComponent, data : {couponDisplayId : '0'} },
      { path: 'takeoff', component: TakeoffComponent, data : {couponDisplayId : '0'} },
      { path: 'complimentary', component: TakeoffComponent, data : {couponDisplayId : '1'} },
    { path: 'free', component: TakeoffComponent,data : {couponDisplayId : '2'} },
    { path: 'daily', component: TakeoffComponent, data : {couponDisplayId : '3'} },
     

    ],
    
    },
  
   

   

    ];

  
  
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
