import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogEstadoRoutingModule } from './logestado-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogEstadoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogEstadoModule { }
