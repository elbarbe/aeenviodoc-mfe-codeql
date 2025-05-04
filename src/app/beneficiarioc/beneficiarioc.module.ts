import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { BeneficiarioCRoutingModule } from './beneficiarioc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    BeneficiarioCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class BeneficiarioCModule { }
