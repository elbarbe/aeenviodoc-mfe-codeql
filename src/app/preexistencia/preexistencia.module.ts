import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PreexistenciaRoutingModule } from './preexistencia-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PreexistenciaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PreexistenciaModule { }
