import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ConfiguracionANSRoutingModule } from './configuracionans-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ConfiguracionANSRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConfiguracionANSModule { }
