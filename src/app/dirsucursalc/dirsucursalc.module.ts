import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { DirSucursalCRoutingModule } from './dirsucursalc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    DirSucursalCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class DirSucursalCModule { }
