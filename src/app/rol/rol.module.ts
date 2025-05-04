import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { RolRoutingModule } from './rol-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    RolRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class RolModule { }
