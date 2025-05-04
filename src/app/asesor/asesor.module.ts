import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AsesorRoutingModule } from './asesor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AsesorRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AsesorModule { }
