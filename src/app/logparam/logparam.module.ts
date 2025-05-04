import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogParamRoutingModule } from './logparam-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogParamRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogParamModule { }
