import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GrupoAsignacionRoutingModule } from './grupoasignacion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GrupoAsignacionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class GrupoAsignacionModule { }
