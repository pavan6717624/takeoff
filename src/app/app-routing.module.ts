import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { PaymentStatusComponent } from './component/payment-status/payment-status.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { PaymentFailedComponent } from './component/payment-failed/payment-failed.component';
import { LoginComponent } from './component/login/login.component';
import { DisplayComponent } from './component/display/display.component';

const routes: Routes = [
  { path:'',component: MainComponent},
  { path: 'subscribe', component: SubscriptionComponent },
  { path: 'paymentStatus', component: PaymentStatusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'display', component: DisplayComponent },
  

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
