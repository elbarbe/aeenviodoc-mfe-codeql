import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EstadoContratoRoutingModule } from './estadocontrato-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EstadoContratoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EstadoContratoModule { }
