import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogLlamadasBHRoutingModule } from './logllamadasbh-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogLlamadasBHRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogLlamadasBHModule { }
