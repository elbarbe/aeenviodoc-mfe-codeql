import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoFacturaRoutingModule } from './tipofactura-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoFacturaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoFacturaModule { }
