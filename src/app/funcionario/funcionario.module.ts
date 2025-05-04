import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FuncionarioRoutingModule } from './funcionario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FuncionarioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FuncionarioModule { }
