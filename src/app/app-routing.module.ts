import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { PaymentStatusComponent } from './component/payment-status/payment-status.component';
import { LoginComponent } from './component/login/login.component';
import { DisplayComponent } from './component/display/display.component';
import { UserComponent } from './component/user/user.component';
import { VendorComponent } from './component/vendor/vendor.component';

const routes: Routes = [
  { path:'',component: MainComponent},
  { path: 'subscribe', component: SubscriptionComponent },
  { path: 'paymentStatus', component: PaymentStatusComponent },
  { path: 'login', component: LoginComponent },

  { path: 'user', component: UserComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'designer', component: VendorComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
