import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ContSinDocSolRoutingModule } from './contsindocsol-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ContSinDocSolRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ContSinDocSolModule { }
