import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ProteccionDatosCRoutingModule } from './protecciondatosc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ProteccionDatosCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ProteccionDatosCModule { }
