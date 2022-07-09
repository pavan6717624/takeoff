import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';

import { NzIconModule,  NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS  } from 'ng-zorro-antd/icon';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { IconDefinition } from '@ant-design/icons-angular';
// Import all. NOT RECOMMENDED. ❌
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzImageModule } from 'ng-zorro-antd/image';
import en from '@angular/common/locales/en-IN';
import { registerLocaleData } from '@angular/common';

import { UserModule } from './user/user.module';

import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { InterceptorService } from './interceptor.service';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAffixModule } from 'ng-zorro-antd/affix';

import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { AdminModule } from './admin/admin.module';
import { ComponentModule } from './component/component.module';
registerLocaleData(en);

const LANG_PROVIDERS = [{ provide: NZ_I18N, useValue: en_US }];

const ngZorroConfig: NzConfig = {
  message: { nzMaxStack: 1 , nzDuration: 10000 },
  notification: { nzMaxStack: 1},
 
};


const antDesignIcons = AllIcons as {
 [key: string]: IconDefinition;
 };
 const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
    
    
  ],
  imports: [
    BrowserModule,
    NzCarouselModule,
    ZXingScannerModule,
    AppRoutingModule,
    HttpClientModule,
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzSelectModule,
    BrowserAnimationsModule,
    NzMessageModule,
    NzAffixModule,
    NzResultModule,
    NzSpinModule,
    NzSwitchModule,
    NzTreeModule, NzIconModule.forRoot(icons),NzMenuModule,
    NzTabsModule,
    NzModalModule,
    NzUploadModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzTableModule,
    NzDatePickerModule,
    UserModule,
    ComponentModule,
    AdminModule,
    NzImageModule,
    NzNotificationModule,
    NzTimePickerModule,
    NzCheckboxModule
  ],
  providers: [LANG_PROVIDERS,{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService, 
    multi: true
  }, { provide: NZ_CONFIG, useValue: ngZorroConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
