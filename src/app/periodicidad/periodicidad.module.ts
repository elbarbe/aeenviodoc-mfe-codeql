import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PeriodicidadRoutingModule } from './periodicidad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PeriodicidadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PeriodicidadModule { }
