import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { MunicipioRoutingModule } from './municipio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    MunicipioRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class MunicipioModule { }
