import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'angular2-chartjs';
import 'chart.piecelabel.js';
@NgModule({
  declarations: [LayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ChartModule
  ]
})
export class AdminModule { }
