import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogAsignacionesRoutingModule } from './logasignaciones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogAsignacionesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogAsignacionesModule { }
