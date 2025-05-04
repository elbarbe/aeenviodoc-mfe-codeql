import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { UsuarioSistemaExternoRoutingModule } from './usuariosistemaexterno-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    UsuarioSistemaExternoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class UsuarioSistemaExternoModule { }
