import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GrupoAsignacionNovedadRoutingModule } from './grupoasignacionnovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GrupoAsignacionNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class GrupoAsignacionNovedadModule { }
