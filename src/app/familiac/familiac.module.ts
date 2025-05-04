import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FamiliaCRoutingModule } from './familiac-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FamiliaCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FamiliaCModule { }
