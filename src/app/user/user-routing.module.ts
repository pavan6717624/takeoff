import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../user/home/home.component';
import { TakeoffComponent } from './takeoff/takeoff.component';
import { ComplimentaryComponent } from './complimentary/complimentary.component';
import { FreeComponent } from './free/free.component';
import { DailyComponent } from './daily/daily.component';

const routes: Routes = [
  {
    path: '',
      component: HomeComponent,
  
    
  
  
  children: [
    { path: '', component: TakeoffComponent },
    { path: 'complimentary', component: ComplimentaryComponent },
    { path: 'free', component: FreeComponent },
    { path: 'daily', component: DailyComponent },
    
   
  
  ],
  },
  
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
