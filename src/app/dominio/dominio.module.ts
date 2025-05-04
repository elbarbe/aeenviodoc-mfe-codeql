import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DominioRoutingModule } from './dominio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DominioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DominioModule { }
