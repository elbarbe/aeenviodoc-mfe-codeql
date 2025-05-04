import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { GestorRoutingModule } from './gestor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    GestorRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class GestorModule { }
