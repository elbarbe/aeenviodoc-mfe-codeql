import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ErrorWSRoutingModule } from './errorws-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ErrorWSRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ErrorWSModule { }
