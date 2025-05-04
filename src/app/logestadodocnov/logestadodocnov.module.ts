import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogEstadoDocNovRoutingModule } from './logestadodocnov-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogEstadoDocNovRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogEstadoDocNovModule { }
