import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { NovedadRoutingModule } from './novedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    NovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class NovedadModule { }
