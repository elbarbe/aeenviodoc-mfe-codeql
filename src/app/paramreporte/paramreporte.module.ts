import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ParamReporteRoutingModule } from './paramreporte-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ParamReporteRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ParamReporteModule { }
