import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { W10001RoutingModule } from './w10001-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    W10001RoutingModule
  ]
})
export class W10001Module { }
