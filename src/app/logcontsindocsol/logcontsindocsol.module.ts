import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { LogContSinDocSolRoutingModule } from './logcontsindocsol-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    LogContSinDocSolRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class LogContSinDocSolModule { }
