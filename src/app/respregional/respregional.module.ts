import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { RespRegionalRoutingModule } from './respregional-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    RespRegionalRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class RespRegionalModule { }
