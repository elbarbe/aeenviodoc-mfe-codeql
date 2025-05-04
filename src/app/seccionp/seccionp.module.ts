import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SeccionPRoutingModule } from './seccionp-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SeccionPRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SeccionPModule { }
