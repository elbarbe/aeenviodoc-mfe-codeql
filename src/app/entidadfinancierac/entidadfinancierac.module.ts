import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EntidadFinancieraCRoutingModule } from './entidadfinancierac-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EntidadFinancieraCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EntidadFinancieraCModule { }
