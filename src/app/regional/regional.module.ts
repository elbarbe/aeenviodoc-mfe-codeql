import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { RegionalRoutingModule } from './regional-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    RegionalRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class RegionalModule { }
