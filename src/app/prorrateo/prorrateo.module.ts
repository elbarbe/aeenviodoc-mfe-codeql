import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ProrrateoRoutingModule } from './prorrateo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ProrrateoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ProrrateoModule { }
