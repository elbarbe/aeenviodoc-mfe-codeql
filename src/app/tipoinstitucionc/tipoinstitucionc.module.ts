import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoInstitucionCRoutingModule } from './tipoinstitucionc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoInstitucionCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoInstitucionCModule { }
