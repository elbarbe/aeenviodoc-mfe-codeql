import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { MesaDeApoyoRoutingModule } from './mesadeapoyo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    MesaDeApoyoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class MesaDeApoyoModule { }
