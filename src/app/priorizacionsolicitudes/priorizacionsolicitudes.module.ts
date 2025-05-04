import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PriorizacionSolicitudesRoutingModule } from './priorizacionsolicitudes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PriorizacionSolicitudesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PriorizacionSolicitudesModule { }
