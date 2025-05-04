import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { MotDevAreaMedicaRoutingModule } from './motdevareamedica-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    MotDevAreaMedicaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class MotDevAreaMedicaModule { }
