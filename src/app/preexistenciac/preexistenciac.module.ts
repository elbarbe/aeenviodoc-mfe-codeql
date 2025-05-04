import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PreexistenciaCRoutingModule } from './preexistenciac-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PreexistenciaCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PreexistenciaCModule { }
