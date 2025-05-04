import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogFuncionarioRoutingModule } from './logfuncionario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogFuncionarioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogFuncionarioModule { }
