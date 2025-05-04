import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ConfiguracionFestivosRoutingModule } from './configuracionfestivos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ConfiguracionFestivosRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConfiguracionFestivosModule { }
