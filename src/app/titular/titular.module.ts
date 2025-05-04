import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TitularRoutingModule } from './titular-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TitularRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TitularModule { }
