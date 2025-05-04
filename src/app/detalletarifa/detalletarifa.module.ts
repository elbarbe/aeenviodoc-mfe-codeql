import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DetalleTarifaRoutingModule } from './detalletarifa-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DetalleTarifaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DetalleTarifaModule { }
