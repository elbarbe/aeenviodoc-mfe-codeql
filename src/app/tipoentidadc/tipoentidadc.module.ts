import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoEntidadCRoutingModule } from './tipoentidadc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoEntidadCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoEntidadCModule { }
