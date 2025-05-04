import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ContratoCRoutingModule } from './contratoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ContratoCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ContratoCModule { }
