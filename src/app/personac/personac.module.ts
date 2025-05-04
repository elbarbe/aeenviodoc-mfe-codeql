import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../commoncomponents.module';
import { PersonaCRoutingModule } from './personac-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    PersonaCRoutingModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class PersonaCModule { }
