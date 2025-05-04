import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TarifaRoutingModule } from './tarifa-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TarifaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TarifaModule { }
