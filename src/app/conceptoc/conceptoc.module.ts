import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ConceptoCRoutingModule } from './conceptoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ConceptoCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ConceptoCModule { }
