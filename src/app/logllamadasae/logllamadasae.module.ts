import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogLlamadasAERoutingModule } from './logllamadasae-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogLlamadasAERoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogLlamadasAEModule { }
