import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { NovedadCTRoutingModule } from './novedadct-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    NovedadCTRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class NovedadCTModule { }
