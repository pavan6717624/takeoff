import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { PaymentStatusComponent } from './component/payment-status/payment-status.component';
import { LoginComponent } from './component/login/login.component';
import { DisplayComponent } from './component/display/display.component';
import { UserComponent } from './component/user/user.component';
import { VendorComponent } from './component/vendor/vendor.component';
import { ReferenceComponent } from './component/reference/reference.component';
import { InvestorComponent } from './component/investor/investor.component';
import { ExecutiveComponent } from './component/executive/executive.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
 { path: 'website', loadChildren: () => import('./websites/websites.module').then(m => m.WebsitesModule) },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
