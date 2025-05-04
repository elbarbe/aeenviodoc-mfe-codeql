import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DireccionCRoutingModule } from './direccionc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DireccionCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DireccionCModule { }
