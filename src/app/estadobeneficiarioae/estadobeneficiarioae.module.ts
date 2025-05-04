import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { EstadoBeneficiarioAERoutingModule } from './estadobeneficiarioae-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EstadoBeneficiarioAERoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class EstadoBeneficiarioAEModule { }
