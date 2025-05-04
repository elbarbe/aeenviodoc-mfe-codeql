import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EstadoCivilRoutingModule } from './estadocivil-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EstadoCivilRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EstadoCivilModule { }
