import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ValorRoutingModule } from './valor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ValorRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ValorModule { }
