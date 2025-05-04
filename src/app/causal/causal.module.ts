import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { CausalRoutingModule } from './causal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    CausalRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CausalModule { }
