import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { FirmaRoutingModule } from './firma-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    FirmaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class FirmaModule { }
