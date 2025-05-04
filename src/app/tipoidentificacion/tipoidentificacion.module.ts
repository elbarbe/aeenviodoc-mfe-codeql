import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoIdentificacionRoutingModule } from './tipoidentificacion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoIdentificacionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoIdentificacionModule { }
