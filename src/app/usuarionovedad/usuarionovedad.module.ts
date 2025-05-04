import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { UsuarioNovedadRoutingModule } from './usuarionovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    UsuarioNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class UsuarioNovedadModule { }
