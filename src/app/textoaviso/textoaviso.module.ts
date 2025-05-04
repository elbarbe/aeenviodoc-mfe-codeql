import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TextoAvisoRoutingModule } from './textoaviso-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TextoAvisoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TextoAvisoModule { }
