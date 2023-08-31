import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NgxUiLoaderModule } from 'ngx-ui-loader';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavComponent } from './nav/nav.component';
//import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxUiLoaderModule
  ]
})
export class DashboardModule { }
