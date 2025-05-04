import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { AnexoCRoutingModule } from './anexoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AnexoCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class AnexoCModule { }
