import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ProteccionDatosRoutingModule } from './protecciondatos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ProteccionDatosRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ProteccionDatosModule { }
