import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogGrupoAsignacionRoutingModule } from './loggrupoasignacion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogGrupoAsignacionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogGrupoAsignacionModule { }
