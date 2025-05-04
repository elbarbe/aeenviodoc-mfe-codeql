import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FamiliaNovedadRoutingModule } from './familianovedad-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FamiliaNovedadRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FamiliaNovedadModule { }
