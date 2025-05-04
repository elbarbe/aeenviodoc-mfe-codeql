import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { CuestionarioPRoutingModule } from './cuestionariop-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    CuestionarioPRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CuestionarioPModule { }
