import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { TipoSucursalCRoutingModule } from './tiposucursalc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    TipoSucursalCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TipoSucursalCModule { }
