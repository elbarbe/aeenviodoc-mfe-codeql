import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { ParentescoRoutingModule } from './parentesco-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    ParentescoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ParentescoModule { }
