import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GrupoAsociadoRoutingModule } from './grupoasociado-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GrupoAsociadoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class GrupoAsociadoModule { }
