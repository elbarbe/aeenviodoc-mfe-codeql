import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PlanesRoutingModule } from './planes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PlanesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PlanesModule { }
