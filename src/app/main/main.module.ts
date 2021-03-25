import { MapComponent } from './map/map.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LineComponent } from './line/line.component';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    LineComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
