import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ComplimentaryComponent } from './complimentary/complimentary.component';
import { FreeComponent } from './free/free.component';
import { DailyComponent } from './daily/daily.component';
import { TakeoffComponent } from './takeoff/takeoff.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { ReplaceNewLinePipe } from './replace-new-line.pipe';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    HomeComponent,
    ComplimentaryComponent,
    FreeComponent,
    DailyComponent,
    TakeoffComponent,
    ReplaceNewLinePipe,
    AccountComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzSelectModule,
    NzMessageModule,
    NzResultModule,
    NzSpinModule,
    NzSwitchModule,
    NzTreeModule,
    NzMenuModule,
    NzTabsModule,
    NzModalModule,
    NzUploadModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzTableModule,
    NzDatePickerModule,
    NzLayoutModule,
    NzGridModule,
    NzImageModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzBackTopModule,
    NzToolTipModule 
  ]
})
export class UserModule { }
