import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { CompanyiaRoutingModule } from './companyia-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    CompanyiaRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CompanyiaModule { }
