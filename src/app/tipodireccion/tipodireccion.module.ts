import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoDireccionRoutingModule } from './tipodireccion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoDireccionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoDireccionModule { }
