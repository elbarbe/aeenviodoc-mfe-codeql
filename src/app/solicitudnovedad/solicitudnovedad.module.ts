import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SolicitudNovedadRoutingModule } from './solicitudnovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SolicitudNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SolicitudNovedadModule { }
