import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EpsRoutingModule } from './eps-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EpsRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EpsModule { }
