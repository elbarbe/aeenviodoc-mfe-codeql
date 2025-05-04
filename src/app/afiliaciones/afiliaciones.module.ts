import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AfiliacionesRoutingModule } from './afiliaciones-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AfiliacionesRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AfiliacionesModule { }
