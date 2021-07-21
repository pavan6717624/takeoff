import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MastheadComponent } from './component/masthead/masthead.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import { HeroComponent } from './component/hero/hero.component';
import { ClientsComponent } from './component/clients/clients.component';
import { AboutComponent } from './component/about/about.component';
import { WhyusComponent } from './component/whyus/whyus.component';
import { ServicesComponent } from './component/services/services.component';
import { CtaComponent } from './component/cta/cta.component';
import { PricingComponent } from './component/pricing/pricing.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { MainComponent } from './component/main/main.component';
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
@NgModule({
  declarations: [
    AppComponent,
    MastheadComponent,
    HeroComponent,
    ClientsComponent,
    AboutComponent,
    WhyusComponent,
    ServicesComponent,
    CtaComponent,
    PricingComponent,

    ContactComponent,
     FooterComponent,
     MainComponent,
     SubscriptionComponent
  ],
  imports: [
    BrowserModule,
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
    NzMessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
