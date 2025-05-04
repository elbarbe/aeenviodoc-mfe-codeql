import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SeccionRoutingModule } from './seccion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SeccionRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SeccionModule { }
