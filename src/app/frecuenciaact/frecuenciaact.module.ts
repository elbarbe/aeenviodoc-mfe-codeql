import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FrecuenciaActRoutingModule } from './frecuenciaact-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FrecuenciaActRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FrecuenciaActModule { }
