import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AnexoMatRoutingModule } from './anexomat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AnexoMatRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AnexoMatModule { }
