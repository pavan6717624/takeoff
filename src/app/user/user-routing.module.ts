import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../user/home/home.component';
import { TakeoffComponent } from './takeoff/takeoff.component';

import { AccountComponent } from './account/account.component';
import { WalletComponent } from './wallet/wallet.component';
import { DisplayComponent } from '../component/display/display.component';


const routes: Routes = [

     { path: '',  component: HomeComponent,
    
    
     children: [
      { path: '', component: TakeoffComponent, data : {couponDisplayId : '0'}, },
      { path: 'takeoff', component: TakeoffComponent, data : {couponDisplayId : '0'} },
      { path: 'complimentary', component: TakeoffComponent, data : {couponDisplayId : '1'} },
    { path: 'free', component: TakeoffComponent,data : {couponDisplayId : '2'} },
    { path: 'daily', component: TakeoffComponent, data : {couponDisplayId : '3'} },
    { path: 'limited', component: TakeoffComponent, data : {couponDisplayId : '4'} },
    { path: 'redeemable', component: TakeoffComponent, data : {couponDisplayId : '5'} },
    { path: 'discount', component: TakeoffComponent, data : {couponDisplayId : '6'} },
    { path: 'display', component: DisplayComponent },
    { path: 'account', component: AccountComponent},
    { path: 'wallet', component: WalletComponent},

    
     

    ],
    
    },
  
   

   

    ];

  
  
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
