import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { InstitucionMatNeoRoutingModule } from './institucionmatneo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    InstitucionMatNeoRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class InstitucionMatNeoModule { }
