import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { MainComponent } from '../component/main/main.component';
import { SubscriptionComponent } from '../component/subscription/subscription.component'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PaymentStatusComponent } from '../component/payment-status/payment-status.component';

import { LoginComponent } from '../component/login/login.component';
import { DisplayComponent } from '../component/display/display.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { VendorComponent } from '../component/vendor/vendor.component';
import { UserComponent } from '../component/user/user.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UploadcouponsComponent } from '../component/uploadcoupons/uploadcoupons.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EditcouponsComponent } from '../component/editcoupons/editcoupons.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ReplaceNewLinePipe } from '../component/replace-new-line.pipe';
import { VendoraccountComponent } from '../component/vendoraccount/vendoraccount.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { NzImageModule } from 'ng-zorro-antd/image';

import { ViewcouponsComponent } from '../component/viewcoupons/viewcoupons.component';
import { UserModule } from '../user/user.module';
import { RedemptionComponent } from '../component/redemption/redemption.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { RedemHistoryComponent } from '../component/redem-history/redem-history.component';
import { ReferenceComponent } from '../component/reference/reference.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { InvestorComponent } from '../component/investor/investor.component';
import { ExecutiveComponent } from '../component/executive/executive.component';
import { FranchizeComponent } from '../component/franchize/franchize.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AboutComponent } from './about/about.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    MainComponent,
     SubscriptionComponent,
     PaymentStatusComponent,

     LoginComponent,
     DisplayComponent,
     VendorComponent,
     UserComponent,
     UploadcouponsComponent,
     EditcouponsComponent,
     ReplaceNewLinePipe,
     VendoraccountComponent,

     ViewcouponsComponent,
     RedemptionComponent,
     RedemHistoryComponent,
     ReferenceComponent,
     InvestorComponent,
     ExecutiveComponent,
     FranchizeComponent,
     AboutComponent,
     WhyUsComponent,
     ProductsComponent,
     ContactComponent,
     SignUpComponent,
     FooterComponent,

  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
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
    NzCarouselModule,
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
//     NzBackTopModule,
    NzToolTipModule ,
    NzEmptyModule,
    NzAffixModule,
    ZXingScannerModule
  ]
})
export class ComponentModule { }
