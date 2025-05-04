import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogConfiguracionANSRoutingModule } from './logconfiguracionans-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogConfiguracionANSRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogConfiguracionANSModule { }
