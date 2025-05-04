import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FormaPagoRoutingModule } from './formapago-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FormaPagoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FormaPagoModule { }
