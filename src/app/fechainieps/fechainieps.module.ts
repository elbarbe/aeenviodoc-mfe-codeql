import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FechaIniEPSRoutingModule } from './fechainieps-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FechaIniEPSRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FechaIniEPSModule { }
