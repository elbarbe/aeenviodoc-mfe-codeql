import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ObservacionesCRoutingModule } from './observacionesc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ObservacionesCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ObservacionesCModule { }
