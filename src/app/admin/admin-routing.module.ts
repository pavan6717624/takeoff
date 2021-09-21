import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { DesignersComponent } from './designers/designers.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CategoryComponent } from './category/category.component';
import { CoupontypesComponent } from './coupontypes/coupontypes.component';
import { ProfessionComponent } from './profession/profession.component';
import { ImagesComponent } from './images/images.component';
import { DisplayComponent } from '../component/display/display.component';
import { UpdateKycComponent } from './update-kyc/update-kyc.component';


const routes: Routes = [

 
  {
    path: '',
    component: HomeComponent,


    children: [
      { path: '', component: StatsComponent },
      { path: 'designers', component: DesignersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'coupontypes', component: CoupontypesComponent },
      { path: 'profession', component: ProfessionComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'display', component: DisplayComponent },
      { path: 'verifyKYC', component: UpdateKycComponent },
     

    ],
  },



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
