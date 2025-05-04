import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PlantillaReporteRoutingModule } from './plantillareporte-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PlantillaReporteRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PlantillaReporteModule { }
