import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DocumentoGRoutingModule } from './documentog-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DocumentoGRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DocumentoGModule { }
