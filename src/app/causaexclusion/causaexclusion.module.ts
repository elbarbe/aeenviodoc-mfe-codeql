import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { CausaExclusionRoutingModule } from './causaexclusion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    CausaExclusionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CausaExclusionModule { }
