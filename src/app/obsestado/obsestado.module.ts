import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ObsEstadoRoutingModule } from './obsestado-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ObsEstadoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ObsEstadoModule { }
