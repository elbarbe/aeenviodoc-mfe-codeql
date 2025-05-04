import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogInformacionAsesorRoutingModule } from './loginformacionasesor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogInformacionAsesorRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogInformacionAsesorModule { }
