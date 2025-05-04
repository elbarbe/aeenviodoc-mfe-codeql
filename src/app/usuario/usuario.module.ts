import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    UsuarioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class UsuarioModule { }
