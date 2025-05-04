import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DocumentoNovedadRoutingModule } from './documentonovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DocumentoNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DocumentoNovedadModule { }
