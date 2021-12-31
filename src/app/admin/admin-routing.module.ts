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
import { GstComponent } from './gst/gst.component';
import { TdsComponent } from './tds/tds.component';
import { ScancodeComponent } from './scancode/scancode.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HitsRecordedComponent } from './hits-recorded/hits-recorded.component';
import { InvestorsComponent } from './investors/investors.component';


const routes: Routes = [

 
  {
    path: '',
    component: HomeComponent,


    children: [
      { path: '', component: StatsComponent },
      { path: 'designers', component: DesignersComponent },
       { path: 'executives', component: ExecutivesComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'investors', component: InvestorsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'coupontypes', component: CoupontypesComponent },
      { path: 'profession', component: ProfessionComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'display', component: DisplayComponent },
      { path: 'verifyKYC', component: UpdateKycComponent },
      { path: 'gst', component: GstComponent },
      { path: 'tds', component: TdsComponent },
      { path: 'scancodes', component: ScancodeComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'hits', component: HitsRecordedComponent },
     

    ],
  },



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
