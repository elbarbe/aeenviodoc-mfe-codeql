import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogContratoComboRoutingModule } from './logcontratocombo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogContratoComboRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogContratoComboModule { }
