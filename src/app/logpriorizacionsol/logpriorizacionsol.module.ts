import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogPriorizacionSolRoutingModule } from './logpriorizacionsol-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogPriorizacionSolRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogPriorizacionSolModule { }
