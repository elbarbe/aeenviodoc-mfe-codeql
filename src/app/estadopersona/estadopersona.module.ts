import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EstadoPersonaRoutingModule } from './estadopersona-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EstadoPersonaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EstadoPersonaModule { }
