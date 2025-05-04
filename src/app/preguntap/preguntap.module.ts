import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PreguntaPRoutingModule } from './preguntap-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PreguntaPRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PreguntaPModule { }
