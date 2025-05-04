import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PregCuesMedCRoutingModule } from './pregcuesmedc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PregCuesMedCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PregCuesMedCModule { }
