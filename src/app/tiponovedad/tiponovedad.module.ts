import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoNovedadRoutingModule } from './tiponovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoNovedadModule { }
