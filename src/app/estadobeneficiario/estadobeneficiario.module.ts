import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EstadoBeneficiarioRoutingModule } from './estadobeneficiario-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EstadoBeneficiarioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EstadoBeneficiarioModule { }
