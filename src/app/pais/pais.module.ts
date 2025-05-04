import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PaisRoutingModule } from './pais-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PaisRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PaisModule { }
