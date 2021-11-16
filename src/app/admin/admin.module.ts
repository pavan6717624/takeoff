import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { VendorsComponent } from './vendors/vendors.component';
import { DesignersComponent } from './designers/designers.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StatsComponent } from './stats/stats.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CategoryComponent } from './category/category.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CoupontypesComponent } from './coupontypes/coupontypes.component';
import { ProfessionComponent } from './profession/profession.component';
import { ImagesComponent } from './images/images.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UpdateKycComponent } from './update-kyc/update-kyc.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { GstComponent } from './gst/gst.component';
import { TdsComponent } from './tds/tds.component';
import { ScancodeComponent } from './scancode/scancode.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HitsRecordedComponent } from './hits-recorded/hits-recorded.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomersComponent,
    DesignersComponent,
    StatsComponent,
    VendorsComponent,
    CategoryComponent,
    CoupontypesComponent,
    ProfessionComponent,
    ImagesComponent,
    UpdateKycComponent,
    GstComponent,
    TdsComponent,
    ScancodeComponent,
    ContactsComponent,
    HitsRecordedComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzInputNumberModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzModalModule,  
    NzSelectModule,
    NzSwitchModule,
    NzSpinModule,
    NzDatePickerModule
    
  ]
})
export class AdminModule {

 }
