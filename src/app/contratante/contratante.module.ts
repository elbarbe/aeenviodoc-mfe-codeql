import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ContratanteRoutingModule } from './contratante-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ContratanteRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ContratanteModule { }
