import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExecutiveComponent } from './executive/executive.component';
import { InvestorComponent } from './investor/investor.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { ProductsComponent } from './products/products.component';
import { ReferenceComponent } from './reference/reference.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
import { WhyUsComponent } from './why-us/why-us.component';

const routes: Routes = [
  { path:'',component: LoginComponent},
  { path:'about',component: AboutComponent},
  { path:'contact',component:ContactComponent},
  { path:'why-us',component: WhyUsComponent},
  { path:'pricing',redirectTo:'freesubscribe'},
  { path:'services',component: ProductsComponent},
  //{ path: '', loadChildren: () => import('./commodule/commodule.module').then(m => m.CommoduleModule) },
  { path: 'subscribe', component: SubscriptionComponent , data : {subscription : 'Pay'}, },
  { path: 'freesubscribe', component: SubscriptionComponent , data : {subscription : 'Free'}, },
  { path: 'paymentStatus', component: PaymentStatusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reference',component: ReferenceComponent},
  { path: 'user', component: UserComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'designer', component: VendorComponent },
  { path: 'investor', component: InvestorComponent },
  { path: 'executive', component: ExecutiveComponent },
  { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
    { path: 'policy', loadChildren: () => import('../commodule/commodule.module').then(m => m.CommoduleModule) },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
