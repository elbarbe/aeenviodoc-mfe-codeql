import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogGruposUsuariosRoutingModule } from './loggruposusuarios-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogGruposUsuariosRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogGruposUsuariosModule { }
