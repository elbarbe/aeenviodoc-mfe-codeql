import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ProductosRoutingModule } from './productos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ProductosRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ProductosModule { }
