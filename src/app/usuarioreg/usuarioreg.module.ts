import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { UsuarioRegRoutingModule } from './usuarioreg-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    UsuarioRegRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class UsuarioRegModule { }
