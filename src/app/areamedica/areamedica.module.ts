import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AreaMedicaRoutingModule } from './areamedica-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AreaMedicaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AreaMedicaModule { }
