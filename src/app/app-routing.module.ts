import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { PaymentStatusComponent } from './component/payment-status/payment-status.component';

const routes: Routes = [
  { path:'',component: MainComponent},
  { path: 'subscribe', component: SubscriptionComponent },
  { path: 'paymentStatus', component: PaymentStatusComponent },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
