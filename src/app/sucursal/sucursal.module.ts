import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { SucursalRoutingModule } from './sucursal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    SucursalRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class SucursalModule { }
