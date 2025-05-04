import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PreguntaRoutingModule } from './pregunta-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PreguntaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PreguntaModule { }
