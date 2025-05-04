import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogEstadoSNRoutingModule } from './logestadosn-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogEstadoSNRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogEstadoSNModule { }
