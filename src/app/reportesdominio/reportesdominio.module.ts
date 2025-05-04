import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ReportesDominioRoutingModule } from './reportesdominio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ReportesDominioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ReportesDominioModule { }
