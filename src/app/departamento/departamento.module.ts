import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DepartamentoRoutingModule } from './departamento-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DepartamentoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DepartamentoModule { }
