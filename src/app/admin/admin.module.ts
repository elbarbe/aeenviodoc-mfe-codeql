import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AdminRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AdminModule { }
