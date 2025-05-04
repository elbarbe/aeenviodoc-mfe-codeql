import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ContratoComboRoutingModule } from './contratocombo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ContratoComboRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ContratoComboModule { }
