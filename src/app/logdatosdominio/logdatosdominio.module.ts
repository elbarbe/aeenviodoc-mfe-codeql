import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogDatosDominioRoutingModule } from './logdatosdominio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogDatosDominioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogDatosDominioModule { }
