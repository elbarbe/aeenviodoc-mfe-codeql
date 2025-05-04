import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { CuestionarioMedRoutingModule } from './cuestionariomed-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    CuestionarioMedRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CuestionarioMedModule { }
