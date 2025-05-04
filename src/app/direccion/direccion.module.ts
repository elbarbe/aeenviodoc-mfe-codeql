import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DireccionRoutingModule } from './direccion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DireccionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DireccionModule { }
