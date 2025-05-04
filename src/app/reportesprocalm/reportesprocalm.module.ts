import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ReportesProcAlmRoutingModule } from './reportesprocalm-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ReportesProcAlmRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ReportesProcAlmModule { }
