import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { MarcaMedicaCRoutingModule } from './marcamedicac-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    MarcaMedicaCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class MarcaMedicaCModule { }
