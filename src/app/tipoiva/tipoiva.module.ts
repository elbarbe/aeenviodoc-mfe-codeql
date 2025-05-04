import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoIVARoutingModule } from './tipoiva-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoIVARoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoIVAModule { }
