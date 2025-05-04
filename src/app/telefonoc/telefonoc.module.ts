import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TelefonoCRoutingModule } from './telefonoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TelefonoCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TelefonoCModule { }
