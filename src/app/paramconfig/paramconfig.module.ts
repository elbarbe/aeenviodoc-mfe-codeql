import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ParamConfigRoutingModule } from './paramconfig-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ParamConfigRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ParamConfigModule { }
