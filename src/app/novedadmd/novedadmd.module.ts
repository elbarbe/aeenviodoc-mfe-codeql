import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { NovedadMDRoutingModule } from './novedadmd-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    NovedadMDRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class NovedadMDModule { }
